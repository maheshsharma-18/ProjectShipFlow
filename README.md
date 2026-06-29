# ShipFlow

**Repo Status:** Monorepo scaffolding, local infra, and initial packages/apps are included. See docs/setup/local.md to run locally.

## About ShipFlow
ShipFlow is a pragmatic, end-to-end shipping platform: a Next.js web app, a NestJS REST API, a BullMQ worker, PostgreSQL via Prisma, Redis for queues, Shippo integration behind a clean adapter, and OpenAI behind a small AI abstraction. Everything runs locally via Docker Compose. The API is versioned under /v1 with OpenAPI docs, and we use a hosted auth provider (Clerk/Auth0) with JWT verification through JWKS.

## Quick Links
- Architecture Overview → [docs/architecture/overview.md](docs/architecture/overview.md)
- Codebase Overview → [docs/codebase/overview.md](docs/codebase/overview.md)
- API Reference → [docs/api/reference.md](docs/api/reference.md)
- Local Setup → [docs/setup/local.md](docs/setup/local.md)

## Contributing
- Contribution guidelines will be added in a future `CONTRIBUTING.md`.
- For architectural decisions, see [docs/decisions/README.md](docs/decisions/README.md) and add ADRs as significant choices are made.

## License
TBD: Add license name and link once selected.

