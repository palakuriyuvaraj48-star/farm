# KrishiAI - Complete Setup & Quick Start Guide

## 🚀 Prerequisites

- Java 17 or higher
- Node.js 18+
- PostgreSQL 14+
- Python 3.10+
- Docker & Docker Compose
- Git

---

## 📋 Environment Setup

### 1. Backend Environment (.env)

Create `backend/.env`:

```properties
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/krishiai
SPRING_DATASOURCE_USERNAME=krishiai_user
SPRING_DATASOURCE_PASSWORD=secure_password_123
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
SPRING_JPA_SHOW_SQL=false

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_recommended
JWT_EXPIRATION=3600000
JWT_REFRESH_EXPIRATION=604800000

# Redis
SPRING_REDIS_HOST=localhost
SPRING_REDIS_PORT=6379
SPRING_REDIS_PASSWORD=redis_password

# AWS
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=krishiai-uploads

# External APIs
WEATHER_API_KEY=your_open_weather_api_key
MARKET_DATA_API_KEY=your_market_data_key

# Email/SMS
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# Application
APP_NAME=KrishiAI
APP_VERSION=1.0.0
SERVER_PORT=8080
```

### 2. Frontend Environment (.env.local)

Create `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_APP_NAME=KrishiAI
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 3. Python AI Environment (.env)

Create `ai-models/.env`:

```
FLASK_ENV=development
FLASK_DEBUG=True
MODEL_PATH=./models
DATA_PATH=./data
LOG_LEVEL=INFO
```

---

## 🐳 Docker Setup

### Start Complete Stack

```bash
# From project root
docker-compose -f infrastructure/docker/docker-compose.yml up -d

# This will start:
# - PostgreSQL
# - Redis
# - Backend API
# - Frontend
# - AI/ML Services
```

### Database Initialization

```bash
# Run migrations
docker-compose exec backend java -cp . org.flywaydb.core.Flyway migrate

# Seed sample data
docker-compose exec postgres psql -U krishiai_user -d krishiai -f /docker-entrypoint-initdb.d/seed.sql
```

---

## 🔧 Local Development Setup

### Backend Setup

```bash
cd backend

# Build
mvn clean install

# Run
mvn spring-boot:run

# Or run with specific profile
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

**Backend runs on:** `http://localhost:8080`
**API Docs:** `http://localhost:8080/swagger-ui.html`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

**Frontend runs on:** `http://localhost:3000`

### AI/ML Setup

```bash
cd ai-models

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Flask API
python src/api/app.py
```

**AI API runs on:** `http://localhost:5000`

---

## 📚 Database Setup

### PostgreSQL Installation

#### Windows
```bash
# Using chocolatey
choco install postgresql

# Or download from https://www.postgresql.org/download/windows/
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
```

#### macOS
```bash
brew install postgresql

# Start service
brew services start postgresql
```

### Create Database & User

```sql
-- Connect to postgres
psql -U postgres

-- Create user
CREATE USER krishiai_user WITH PASSWORD 'secure_password_123';

-- Create database
CREATE DATABASE krishiai OWNER krishiai_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE krishiai TO krishiai_user;

-- Connect to database
\c krishiai

-- Create extensions
CREATE EXTENSION IF NOT EXISTS uuid-ossp;

-- Exit
\q
```

### Initialize Schema

```bash
cd backend

# Run migrations
mvn flyway:migrate

# Or using psql
psql -U krishiai_user -d krishiai -f src/main/resources/db/migration/V1__Initial_Schema.sql
```

---

## 🔐 Security Setup

### Generate JWT Secret

```bash
# Generate a secure random string (minimum 32 characters)
openssl rand -base64 32
```

### SSL Certificate (Production)

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

---

## 📱 Frontend Mobile Testing

### Run on Mobile Device

```bash
# Get your machine's local IP
ipconfig getifaddr en0  # Mac/Linux
ipconfig             # Windows - look for IPv4 Address

# Start frontend accessible on network
npm run dev -- -H 0.0.0.0

# Access from mobile browser
http://<your-ip>:3000
```

### Progressive Web App (PWA)

```bash
# Build PWA
npm run build

# Serve locally
npx serve -s out
```

---

## 🧪 Running Tests

### Backend Tests

```bash
cd backend

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=FarmerServiceTest

# Run with coverage
mvn jacoco:report

# View coverage report
open target/site/jacoco/index.html
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm run test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

### AI/ML Tests

```bash
cd ai-models

# Run tests
pytest

# Run with coverage
pytest --cov=src tests/
```

---

## 📊 Sample Data Seeding

### Agricultural Data

```sql
-- Insert crop master data
INSERT INTO crop (crop_name, scientific_name, crop_type, min_temperature, max_temperature, 
                  optimal_rainfall, growing_season_days, min_soil_ph, max_soil_ph, 
                  water_requirement_mm, yield_potential_quintals_per_hectare)
VALUES 
('COTTON', 'Gossypium hirsutum', 'CASH_CROP', 20, 38, 600, 190, 6.0, 7.5, 1200, 20),
('SUGARCANE', 'Saccharum officinarum', 'CASH_CROP', 25, 35, 2000, 360, 5.5, 8.0, 2250, 500),
('RICE', 'Oryza sativa', 'CEREAL', 20, 35, 1500, 120, 5.0, 7.5, 1500, 50),
('WHEAT', 'Triticum aestivum', 'CEREAL', 10, 25, 500, 120, 5.5, 8.0, 600, 40),
('GROUNDNUT', 'Arachis hypogaea', 'OIL_CROP', 20, 30, 600, 150, 5.5, 7.0, 600, 20);

-- Insert government schemes
INSERT INTO scheme (scheme_name, scheme_code, description, ministry_department, 
                    scheme_type, eligibility_criteria, benefits, subsidy_percentage)
VALUES 
('PM-KISAN', 'PKS-001', 'Pradhan Mantri Kisan Samman Nidhi', 'Ministry of Agriculture', 
 'INCOME_SUPPORT', 'All farmers', '₹6000 annually', 100),
('SOIL_HEALTH_CARD', 'SHC-001', 'Soil Health Card Scheme', 'Ministry of Agriculture',
 'SOIL_TESTING', 'All farmers', 'Free soil testing', 100);
```

---

## 🚨 Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Find and kill process on port 8080
lsof -i :8080
kill -9 <PID>
```

**Database Connection Failed**
```bash
# Check PostgreSQL is running
psql -U krishiai_user -d krishiai -c "SELECT 1"

# Check connection string in application.properties
```

**JWT Token Invalid**
```bash
# Regenerate JWT secret in .env
# Restart application
```

### Frontend Issues

**Port 3000 in Use**
```bash
npm run dev -- -p 3001
```

**Node Modules Issues**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

**Migration Failed**
```bash
# Check migration status
mvn flyway:info

# Repair/Undo
mvn flyway:undo
```

---

## 📈 Performance Tuning

### Backend

```properties
# Connection Pool
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5

# Cache
spring.cache.type=redis
spring.redis.timeout=60000

# JPA
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
```

### PostgreSQL

```sql
-- Analyze query performance
ANALYZE;

-- Reindex tables
REINDEX DATABASE krishiai;

-- Vacuum tables
VACUUM ANALYZE;
```

---

## 🌐 Deployment

### AWS Deployment

```bash
# Build JAR
cd backend
mvn clean package -DskipTests

# Push Docker image
docker tag krishiai-backend:latest <your-ecr-uri>/krishiai-backend:latest
docker push <your-ecr-uri>/krishiai-backend:latest

# Deploy using CloudFormation or Terraform
cd ../infrastructure/aws/terraform
terraform plan
terraform apply
```

### Kubernetes Deployment

```bash
# Create namespace
kubectl create namespace krishiai

# Apply configurations
kubectl apply -f infrastructure/kubernetes/

# Check deployment
kubectl get deployments -n krishiai
kubectl logs -n krishiai <pod-name>
```

---

## 📞 Support Commands

### Health Checks

```bash
# Backend health
curl http://localhost:8080/actuator/health

# Database
psql -U krishiai_user -d krishiai -c "SELECT 1"

# Redis
redis-cli ping

# Frontend
curl http://localhost:3000
```

### Logs

```bash
# Backend logs
tail -f logs/application.log

# Frontend logs (from browser console)
# Browser DevTools > Console

# Docker logs
docker-compose logs -f backend
```

---

## 📚 Documentation Links

- API Docs: `http://localhost:8080/swagger-ui.html`
- Database Schema: `docs/DATABASE_SCHEMA.md`
- Architecture: `docs/ARCHITECTURE.md`
- API Reference: `docs/API_DOCUMENTATION.md`

---

## ✅ Quick Verification Checklist

- [ ] Java 17 installed: `java -version`
- [ ] Node.js installed: `node -v`
- [ ] PostgreSQL running: `psql --version`
- [ ] Redis running: `redis-cli ping`
- [ ] Python installed: `python --version`
- [ ] .env files created
- [ ] Database initialized
- [ ] Backend running on 8080
- [ ] Frontend running on 3000
- [ ] AI API running on 5000
- [ ] Can access Swagger UI
- [ ] Can login with test credentials

---

## 🎯 Next Steps

1. ✅ Setup complete
2. Create test farmer account
3. Explore API using Swagger
4. Test crop recommendation
5. Test disease detection
6. Deploy to staging
7. Load testing
8. Production deployment

---

**For additional help:**
- Check logs in `logs/` directory
- Review error messages in browser console
- Check PostgreSQL logs
- Review Docker compose logs

