# Local Development Setup

Use this guide to set up ShipFlow locally using Docker Compose. This will start Postgres, Redis, the API, the worker, and the web app.

## Prerequisites
- Node 18+
- pnpm 9+
- Docker Desktop/Engine
- Accounts/keys for: Auth provider (Clerk/Auth0), Shippo (test), OpenAI (dev)

## Setup Steps

### Install dependencies
```
pnpm install
```

### Start services
```
cp .env.example .env
# Fill in your credentials in .env
pnpm make dev
```

### Run database migrations/seed
```
pnpm -w --filter @shipflow/db run migrate:dev
```

### Run the application(s)
```
# In one shell, or rely on compose dev targets
pnpm -r --parallel run dev
```

### Run tests and linters
```
pnpm -r run test
pnpm -r run lint
```

## Troubleshooting
- If JWT verification fails, verify AUTH_ISSUER_URL, AUTH_AUDIENCE, and AUTH_JWKS_URL.
- If label purchase retries, ensure idempotency keys are set and DB constraints exist.
- Webhook 401: confirm SHIPPO_WEBHOOK_SECRET matches your Shippo webhook settings.
- CORS errors: API allows http://localhost:3000; avoid other origins during dev.

