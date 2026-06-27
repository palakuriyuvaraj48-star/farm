# KrishiAI - Smart Farmer Decision Support System

KrishiAI is a production-style agriculture platform built for Indian farmers. It combines farm profile management, AI-backed recommendations, market intelligence, finance support, and ecosystem workflows in a web and mobile-friendly stack.

## Tech stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Spring Boot, JWT auth, JPA, PostgreSQL
- AI: FastAPI, Python, scikit-learn and TensorFlow-ready inference scaffolding
- DevOps: Docker Compose with AWS and Kubernetes-ready structure

## Implemented platform slices

- farmer dashboard overview
- crop recommendation with confidence and reasons
- profit prediction with disclaimer
- weather and irrigation insights
- disease detection contract
- market and selling snapshot
- scheme matching preview
- community, warehouse, labor, marketplace, and finance previews

## Key documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Project Structure](PROJECT_STRUCTURE.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [ER Diagram](docs/ER_DIAGRAM.md)
- [User Flows](docs/USER_FLOWS.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [Testing Strategy](docs/TESTING_STRATEGY.md)

## Local development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

### AI service

```bash
cd ai-models
pip install -r requirements.txt
uvicorn main:app --reload --port 5000
```

### Full stack with Docker

```bash
docker compose -f infrastructure/docker/docker-compose.yml up --build
```

## Product notes

- AI outputs include confidence scores, reasoning, and disclaimers.
- Offline-friendly frontend behavior is structured through manifest support and local fallback data.
- The repo is suitable both for final-year demonstration and as a foundation for a startup MVP.
