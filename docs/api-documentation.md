# College ERP API Documentation

## Base URL
`/api/v1`

## Authentication
All protected routes require a Bearer token in the `Authorization` header.

## Endpoints

### Auth
- `POST /auth/login`: Authenticate user and return JWT.
- `POST /auth/register`: Register a new system user.

### Users
- `GET /users`: List all users (Admin only).
- `GET /users/:id`: Get specific user.

### Students
- `GET /students/attendance`: Get attendance records for the logged-in student.
- `GET /students/results`: Get academic results.

### Faculty
- `POST /faculty/attendance`: Submit attendance for a class.
- `POST /faculty/grades`: Submit grades.

### AI Assistant
- `POST /ai/chat`: Interact with the ERP chatbot.
