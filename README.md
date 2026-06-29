# ShipFlow AI Monorepo

A typed, modular monorepo implementing the core Feature → PRD → Tasks → Code → AI Review → Fix → Re‑Review → Human Approval → Ship loop with multitenant workspaces, async workflows, and GitHub webhook tracking.

## Stack
- UI: Next.js (App Router) + Tailwind + shadcn/ui primitives
- API: tRPC
- Workflows: Inngest
- DB: Prisma + PostgreSQL
- Integrations: GitHub App (Octokit), Razorpay
- Auth: BetterAuth
- AI: Vercel AI SDK targeting OpenAI-compatible providers

## Workspaces
- apps/web — Next.js app
- packages/db — Prisma client and schema
- packages/api — tRPC routers
- packages/auth — BetterAuth config
- packages/github — Octokit helpers and webhook verification
- packages/ai — Vercel AI SDK wrapper and prompts
- packages/inngest — Inngest client and functions
- packages/ui — shadcn-based component primitives

## Prerequisites
See .env.example for required env vars. For GitHub App and Razorpay, configure webhooks to:
- GitHub: /api/github/webhook
- Razorpay: /api/razorpay/webhook

Use ngrok (or similar) during local dev.

## Scripts
- Build: npm run --workspaces build
- Dev app: npm run dev (runs apps/web)
- Tests: npm run --workspaces test

## Local development
1. Create a PostgreSQL database and set DATABASE_URL
2. Install deps: npm install
3. Generate Prisma client: npm run --workspace packages/db db:generate
4. Start dev server: npm run dev

## Notes
- All database access must be scoped by workspace
- Inngest functions are idempotent and use deterministic keys
- Webhooks are verified and treated as untrusted input; minimal facts are persisted before enqueuing work
