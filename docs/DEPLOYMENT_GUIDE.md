# KrishiAI Deployment & DevOps Guide

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CloudFront CDN                           │
│              (Caching + DDoS Protection)                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼────────────┐      ┌────────▼──────────┐
│   S3 Static Assets │      │  ALB (Load        │
│   (Frontend SPA)   │      │   Balancer)       │
│                    │      │                   │
│ - HTML, CSS, JS    │      │ - Port 80 → 8080  │
│ - Images           │      │ - Port 443 → 8080 │
│ - Manifests        │      │                   │
└────────────────────┘      └────────┬──────────┘
                                     │
                ┌────────────────────┼────────────────────┐
                │                    │                    │
        ┌───────▼───────┐  ┌────────▼────────┐  ┌───────▼──────┐
        │ EKS Cluster   │  │ ECS Services    │  │ EC2 Instances│
        │ (Kubernetes)  │  │ (Docker)        │  │ (Fallback)   │
        │               │  │                 │  │              │
        │ - Pods        │  │ - Backend       │  │ - Backend    │
        │ - Services    │  │ - Frontend      │  │ - Frontend   │
        │ - Ingress     │  │ - AI Service    │  │ - AI Service │
        └───────┬───────┘  └────────┬────────┘  └───────┬──────┘
                │                   │                   │
        ┌───────┴─────────────────┬─┴─────────────────┬─┴────┐
        │                         │                   │      │
    ┌───▼────────┐    ┌──────────▼─────┐  ┌────────┴──┐   ┌─▼──────┐
    │ RDS Aurora │    │  ElastiCache   │  │    S3    │   │ Secrets│
    │ (PostgreSQL)    │   (Redis)      │  │ (Backups)│   │Manager │
    └────────────┘    └────────────────┘  └──────────┘   └────────┘
```

## Cloud Provider: AWS

### Region Strategy
```
Primary: ap-south-1 (Mumbai)
  - Low latency for Indian users
  - Cost-effective
  - All services available

Backup: ap-southeast-1 (Singapore)
  - Disaster recovery
  - Data redundancy

Backup: eu-west-1 (Ireland)
  - Data residency compliance
  - International user support
```

### AWS Services

#### Compute
- **EKS**: Production Kubernetes cluster
- **ECS**: Alternative container orchestration
- **EC2**: Virtual machines for backend services
- **Lambda**: Serverless for scheduled tasks (daily reports, notifications)

#### Storage
- **RDS Aurora PostgreSQL**: Primary database
  - Multi-AZ replication
  - Automated backups (7-day retention)
  - Read replicas for analytics

- **S3**: Object storage
  - Frontend static assets
  - User uploads (disease images)
  - Backups and archives
  - Versioning enabled

- **EBS**: Block storage
  - Database volumes
  - Cache volumes

#### Networking
- **VPC**: Virtual Private Cloud
  - Public subnets (NAT Gateway, ALB)
  - Private subnets (RDS, ElastiCache)
  - Security groups per layer

- **ALB**: Application Load Balancer
  - Port 80 → HTTPS redirect
  - Port 443 → Backend services
  - Path-based routing (/api, /health)
  - SSL termination

- **Route 53**: DNS
  - Domain management
  - Health checks
  - Failover routing

- **CloudFront**: CDN
  - Caching static assets
  - DDoS protection
  - Global distribution

#### Database
- **RDS Aurora**: Multi-AZ, auto-scaling
  - Automated failover (60s)
  - Point-in-time recovery
  - Encryption at rest

#### Cache
- **ElastiCache Redis**: Session storage, caching
  - Cluster mode enabled (sharding)
  - Automatic failover
  - Encryption at rest & in transit

#### Security
- **Secrets Manager**: API keys, database passwords
  - Automatic rotation
  - Audit logging

- **IAM**: Identity and access management
  - Service roles
  - Least privilege policies

- **ACM**: SSL/TLS certificates
  - Auto-renewal
  - Wildcard support

#### Monitoring
- **CloudWatch**: Metrics, logs, alarms
- **X-Ray**: Distributed tracing
- **CloudTrail**: Audit logging

## Kubernetes Deployment (EKS)

### Cluster Configuration
```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: krishiai-prod
  region: ap-south-1
nodeGroups:
  - name: backend-nodes
    instanceType: t3.large
    desiredCapacity: 3
    minSize: 2
    maxSize: 10
    autoScaling: true
  - name: ai-nodes
    instanceType: g4dn.xlarge
    desiredCapacity: 2
    minSize: 1
    maxSize: 5
    labels:
      workload: ai
    taints:
      - key: gpu
        value: "true"
        effect: NoSchedule
```

### Namespace Setup
```bash
kubectl create namespace krishiai-prod
kubectl create namespace krishiai-staging

# Service accounts
kubectl create serviceaccount backend-sa -n krishiai-prod
kubectl create serviceaccount ai-service-sa -n krishiai-prod
```

### Backend Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: krishiai-backend
  namespace: krishiai-prod
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      serviceAccountName: backend-sa
      containers:
      - name: backend
        image: 123456789.dkr.ecr.ap-south-1.amazonaws.com/krishiai-backend:latest
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: jwt-secret
              key: token
        - name: REDIS_URL
          valueFrom:
            configMapKeyRef:
              name: redis-config
              key: url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: krishiai-prod
spec:
  selector:
    app: backend
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
  namespace: krishiai-prod
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: krishiai-backend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### AI Service Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: krishiai-ai-service
  namespace: krishiai-prod
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ai-service
  template:
    metadata:
      labels:
        app: ai-service
    spec:
      nodeSelector:
        workload: ai
      containers:
      - name: ai-service
        image: 123456789.dkr.ecr.ap-south-1.amazonaws.com/krishiai-ai:latest
        ports:
        - containerPort: 5000
        env:
        - name: TF_CPP_MIN_LOG_LEVEL
          value: "2"
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
            nvidia.com/gpu: "1"
          limits:
            memory: "4Gi"
            cpu: "2000m"
            nvidia.com/gpu: "1"
        livenessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 60
          periodSeconds: 30
```

## Database Deployment (RDS)

### Aurora PostgreSQL Setup
```bash
# Create DB cluster
aws rds create-db-cluster \
  --db-cluster-identifier krishiai-prod \
  --engine aurora-postgresql \
  --engine-version 15.2 \
  --master-username admin \
  --master-user-password <GENERATED_PASSWORD> \
  --database-name krishiai \
  --db-subnet-group-name krishiai-subnet \
  --vpc-security-group-ids sg-xxxxx \
  --backup-retention-period 30 \
  --deletion-protection \
  --storage-encrypted \
  --region ap-south-1

# Create DB instances
aws rds create-db-instance \
  --db-instance-identifier krishiai-prod-01 \
  --db-instance-class db.t3.large \
  --engine aurora-postgresql \
  --db-cluster-identifier krishiai-prod \
  --publicly-accessible false \
  --auto-minor-version-upgrade true
```

### Database Initialization
```bash
# Connect to DB
psql -h krishiai-prod.ap-south-1.rds.amazonaws.com \
     -U admin \
     -d krishiai

# Run migrations
flyway migrate

# Verify
\dt  # List tables
\di  # List indexes
```

## Cache Deployment (ElastiCache)

### Redis Cluster Setup
```bash
aws elasticache create-replication-group \
  --replication-group-description "KrishiAI Cache" \
  --replication-group-id krishiai-redis \
  --engine redis \
  --cache-node-type cache.r6g.large \
  --num-cache-clusters 3 \
  --automatic-failover-enabled \
  --multi-az-enabled \
  --at-rest-encryption-enabled \
  --in-transit-encryption-enabled \
  --security-group-ids sg-xxxxx
```

## Storage Deployment (S3)

### Buckets Setup
```bash
# Frontend bucket
aws s3 mb s3://krishiai-frontend-prod

# Backend bucket
aws s3 mb s3://krishiai-uploads-prod

# Backup bucket
aws s3 mb s3://krishiai-backups-prod

# Configure versioning
aws s3api put-bucket-versioning \
  --bucket krishiai-uploads-prod \
  --versioning-configuration Status=Enabled

# Configure encryption
aws s3api put-bucket-encryption \
  --bucket krishiai-uploads-prod \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'
```

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          
      - name: Build Backend
        run: |
          cd backend
          ./mvnw clean package -DskipTests
          
      - name: Test Backend
        run: |
          cd backend
          ./mvnw test
          
      - name: Build Frontend
        run: |
          cd frontend
          npm install
          npm run build
          
      - name: Test Frontend
        run: |
          cd frontend
          npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: ap-south-1
          
      - name: Login to ECR
        run: aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.ap-south-1.amazonaws.com
        
      - name: Build and Push Backend Image
        run: |
          docker build -f backend/Dockerfile -t krishiai-backend:latest backend/
          docker tag krishiai-backend:latest ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.ap-south-1.amazonaws.com/krishiai-backend:latest
          docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.ap-south-1.amazonaws.com/krishiai-backend:latest
          
      - name: Build and Push AI Service Image
        run: |
          docker build -f ai-models/Dockerfile -t krishiai-ai:latest ai-models/
          docker tag krishiai-ai:latest ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.ap-south-1.amazonaws.com/krishiai-ai:latest
          docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.ap-south-1.amazonaws.com/krishiai-ai:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to EKS
        run: |
          aws eks update-kubeconfig --name krishiai-prod --region ap-south-1
          kubectl apply -f infrastructure/k8s/backend-deployment.yaml
          kubectl apply -f infrastructure/k8s/ai-deployment.yaml
          kubectl rollout status deployment/krishiai-backend -n krishiai-prod
```

## Backup & Disaster Recovery

### Backup Strategy
```
Database: Automated RDS backups (daily)
- Retention: 30 days
- Point-in-time recovery: 7 days
- Cross-region backup: ap-southeast-1

S3: Versioning enabled
- File retention: 90 days
- Cross-region replication

Application Code: GitHub
- Version control
- Tag releases

Configuration: AWS Secrets Manager
- Automatic rotation
- Audit trail
```

### Disaster Recovery

#### RTO/RPO Targets
| Component | RTO | RPO |
|-----------|-----|-----|
| Database | 15 min | 5 min |
| Application | 10 min | 0 min |
| Static Assets | 30 min | 0 min |

#### Failover Procedure
```bash
# 1. Promote read replica to standalone
aws rds promote-read-replica \
  --db-instance-identifier krishiai-backup

# 2. Update application config
kubectl set env deployment/krishiai-backend \
  DATABASE_URL=<new_db_url> \
  -n krishiai-prod

# 3. Verify health
kubectl get pods -n krishiai-prod
curl https://api.krishiai.com/health
```

## Monitoring & Logging

### CloudWatch Dashboard
```bash
# Create dashboard
aws cloudwatch put-dashboard \
  --dashboard-name KrishiAI-Prod \
  --dashboard-body file://dashboard.json
```

### Alarms
```bash
# CPU > 80%
aws cloudwatch put-metric-alarm \
  --alarm-name backend-cpu-high \
  --alarm-description "Backend CPU > 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:ap-south-1:xxx:prod-alerts

# Database connections > 80%
aws cloudwatch put-metric-alarm \
  --alarm-name rds-connections-high \
  --metric-name DatabaseConnections \
  --namespace AWS/RDS \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold
```

### Log Aggregation
```
CloudWatch Logs Groups:
- /krishiai/backend
- /krishiai/ai-service
- /krishiai/frontend
- /krishiai/database

Retention: 30 days
```

## Performance Optimization

### Frontend
- CDN caching: 1 year for versioned assets
- Compression: gzip + brotli
- Image optimization: WebP format
- Code splitting: By module

### Backend
- Database connection pooling: 20-50 connections
- Redis caching: Session + API responses
- Request batching: Reduce API calls
- Async processing: Long-running operations

### Database
- Indexes: On frequently queried columns
- Partitioning: By date for large tables
- Connection pooling: PgBouncer
- Query optimization: EXPLAIN ANALYZE

## Security Hardening

### Network
- WAF rules (DDoS, SQL injection)
- Security groups: Least privilege
- VPC endpoints: Private connectivity
- Network ACLs: Restrict access

### Application
- HTTPS only
- Dependency scanning
- Secret rotation
- Rate limiting

### Infrastructure
- Encryption: At rest + in transit
- Key management: AWS KMS
- Audit logging: CloudTrail
- Compliance: Regular audits

## Cost Optimization

### Recommendations
- Use spot instances for non-critical workloads
- Reserved instances for baseline load
- Caching to reduce database queries
- S3 Glacier for cold backups
- Auto-scaling for variable workloads

## Runbook Templates

### Database Performance Degradation
1. Check slow query logs
2. Analyze explain plans
3. Add missing indexes
4. Check connection count
5. Scale if needed

### Service Restart
1. kubectl scale deployment krishiai-backend --replicas=0
2. kubectl scale deployment krishiai-backend --replicas=3
3. Monitor logs for errors

### SSL Certificate Renewal
1. AWS ACM auto-renewal (automatic)
2. Verify renewal email
3. CloudFront cache invalidation
