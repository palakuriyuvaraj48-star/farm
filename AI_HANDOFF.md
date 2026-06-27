# AI Handoff Notes

This repository is for a farming/agriculture platform currently named **KrishiAI**.

## User Goal

The user shared this Lovable URL:

https://yield-wisdom-hub.lovable.app/

They want this project to be easy to upload into Claude or Codex and continue developing. The likely goal is to connect, recreate, or improve the Lovable-style farming/yield wisdom app using this local codebase.

## Important Context

The assistant could not access the live Lovable page content directly, so exact visual matching requires screenshots or exported Lovable files from the user.

## Current Local Project

This repo already contains a full agriculture decision-support app:

- `frontend/`: Next.js, React, TypeScript, Tailwind CSS
- `backend/`: Spring Boot, JWT auth, JPA, PostgreSQL-ready APIs
- `ai-models/`: FastAPI/Python AI advisory and OCR scaffolding
- `docs/`: architecture, setup, API, deployment, database, testing, and user-flow docs

## Product Understanding

The app supports or previews:

- Crop recommendation
- Profit prediction
- Weather and irrigation insights
- Pest alerts
- Disease detection
- Soil health OCR
- Market price advisor
- Equipment rental
- WhatsApp and voice assistant flows
- Farmer dashboard and registration

## Recommended Next Step

If continuing this project, first ask the user for screenshots of the Lovable site homepage and any main pages they want copied. Then compare those screenshots with `frontend/src/app/page.tsx` and the existing routes under `frontend/src/app/`.

If screenshots are unavailable, proceed with the existing KrishiAI design and rename/rebrand it to **Yield Wisdom Hub** only if the user confirms that name.
