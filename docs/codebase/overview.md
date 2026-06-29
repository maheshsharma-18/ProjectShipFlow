# Codebase Overview (TBD)

Purpose (TBD): Summarize the tech stack, repository structure, and developer workflows. Update as code is added.

## Checklist
- [ ] Languages and versions (e.g., Python/Node/Go)
- [ ] Package management (pip/poetry, npm/pnpm/yarn, go modules)
- [ ] Build tools (makefiles, scripts)
- [ ] Test frameworks and how to run tests
- [ ] Lint/format (ruff/flake8/black, eslint/prettier, golangci-lint)
- [ ] Directory structure (high-level tree)
- [ ] Module boundaries and layering

## Guidance for Later
- Generate a shallow directory tree:
  - macOS/Linux: `tree -L 2 -a -I 'node_modules|.git|venv|.venv|dist|build'`
  - If `tree` is unavailable: `find . -maxdepth 2 -type d | sort`
- Count lines of code:
  - `cloc .` or `scc .` (if installed)
- Document common dev commands:
  - `make help` or `npm run` or `poetry run` as applicable

## Directory Structure (TBD)
```
TBD: Add a trimmed tree here once code exists
```

## Testing (TBD)
TBD: How to run unit/integration tests, coverage thresholds, and CI hooks.

## Linting & Formatting (TBD)
TBD: Tools, configs, and pre-commit hooks.
