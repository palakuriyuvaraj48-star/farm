# Folder Structure

The project follows a Feature-Based Architecture emphasizing separation of concerns and modularity.

```text
/
├── client/                     # Frontend Application (React/Vite)
│   ├── src/
│   │   ├── assets/             # Static files like images, icons
│   │   ├── components/         # Shared UI components
│   │   ├── hooks/              # Shared custom React hooks
│   │   ├── layouts/            # Page layouts
│   │   ├── modules/            # Feature-based modules (Admin, Student, Faculty, etc.)
│   │   │   ├── admin/
│   │   │   ├── student/
│   │   │   ├── faculty/
│   │   │   └── shared/
│   │   ├── pages/              # Top-level pages (mostly wrapping module components)
│   │   ├── routes/             # Route configurations
│   │   ├── services/           # API clients and external services
│   │   ├── store/              # Global state management
│   │   ├── styles/             # Global styles and Tailwind configuration
│   │   ├── types/              # TypeScript definitions
│   │   └── utils/              # Helper functions
│   ├── index.html
│   └── package.json
│
├── server/                     # Backend Application (Express/Node.js)
│   ├── config/                 # Environment variables and configuration files
│   ├── jobs/                   # Background jobs and cron tasks
│   ├── middleware/             # Express middlewares (Auth, Error handling)
│   ├── modules/                # Feature-based modules
│   │   ├── users/
│   │   ├── students/
│   │   ├── faculty/
│   │   ├── courses/
│   │   └── attendance/
│   ├── prisma/                 # Prisma schema and migrations
│   ├── routes/                 # Centralized route definitions
│   ├── services/               # Shared business logic and external integrations
│   ├── sockets/                # WebSocket handlers
│   ├── utils/                  # Helper functions
│   ├── package.json
│   └── server.ts
│
├── docker-compose.yml
├── README.md
└── architecture.md
```
