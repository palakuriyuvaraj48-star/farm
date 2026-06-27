# KrishiAI Project Structure

```text
farm/
├── frontend/
│   ├── public/
│   │   ├── manifest.json
│   │   └── icons/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── src/main/java/com/krishiai/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── service/
│   │   └── exception/
│   ├── src/main/resources/db/migration/
│   ├── pom.xml
│   └── Dockerfile
├── ai-models/
│   ├── app/
│   ├── schemas/
│   ├── services/
│   ├── main.py
│   └── Dockerfile
├── infrastructure/
│   ├── docker/
│   └── kubernetes/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   ├── ER_DIAGRAM.md
│   ├── USER_FLOWS.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── SETUP_GUIDE.md
│   ├── TESTING_STRATEGY.md
│   └── ROADMAP.md
└── README.md
```

## Notes

- `frontend` contains the farmer-facing PWA and admin-friendly responsive console.
- `backend` owns persistence, auth, orchestration, and policy decisions.
- `ai-models` exposes explainable prediction endpoints.
- `infrastructure` contains local compose and Kubernetes deployment assets.
- `docs` holds architecture, schema, and delivery documentation.
