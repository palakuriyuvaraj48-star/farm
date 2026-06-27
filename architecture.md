# College ERP Platform - Architecture

## High-Level Architecture
This project uses a modern web stack (React/Vite for frontend, Node.js/Express for backend, PostgreSQL with Prisma) deployed on cloud infrastructure.
It follows Clean Architecture and Feature-Based Architecture principles.

## Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand / Redux Toolkit
- **Routing**: React Router DOM
- **API Client**: Axios

## Backend
- **Framework**: Express.js (Node.js)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Caching**: Redis
- **Authentication**: JWT & Role-Based Access Control (RBAC)

## Deployment & DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions / GitLab CI
- **Cloud**: AWS (EC2, RDS, S3 for storage)

## Core Principles
1. **SOLID Principles**: Object-oriented design.
2. **Clean Architecture**: Separation of concerns across distinct layers.
3. **Repository Pattern**: Abstracting data access for flexibility and testability.
4. **Service Layer**: Business logic encapsulation independent of transport (HTTP).
5. **Dependency Injection**: Loose coupling of services and repositories.
6. **Feature-Based Architecture**: Grouping code by domain rather than purely by technical concern.
