.PHONY: dev build test lint db-migrate db-reset compose-up compose-down

SHELL := /bin/bash

dev:
	@echo "Starting local dev via docker compose";
	docker compose -f infra/docker-compose.yml up --build -d

build:
	pnpm -w -r build

test:
	pnpm -w -r test

lint:
	pnpm -w -r lint

db-migrate:
	pnpm -w --filter @shipflow/db run migrate:dev

db-reset:
	pnpm -w --filter @shipflow/db run reset

compose-up:
	docker compose -f infra/docker-compose.yml up --build -d

compose-down:
	docker compose -f infra/docker-compose.yml down -v
