# Deployment Guide

## Prerequisites
- Docker and Docker Compose installed.
- AWS CLI configured (if deploying to AWS).

## Local Development
1. Clone the repository.
2. Run `npm install` in both `/client` and `/server`.
3. Create `.env` files based on `.env.example`.
4. Run `docker-compose up -d db redis` to start backing services.
5. In `server/`, run `npx prisma migrate dev` to setup DB schema.
6. Run `npm run dev` in both directories.

## Production Deployment using Docker
1. Ensure `.env` files are configured for production.
2. Run `docker-compose up -d --build`.
3. The frontend will be available on port 80 and backend on port 5000.

## AWS Architecture
- **Frontend**: Hosted on AWS S3 & CloudFront (CDN) or inside the Docker container on EC2.
- **Backend**: Deployed on AWS ECS (Elastic Container Service) or EC2.
- **Database**: AWS RDS for PostgreSQL.
- **Cache**: AWS ElastiCache for Redis.
