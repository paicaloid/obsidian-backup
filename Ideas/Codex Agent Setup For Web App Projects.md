# Codex Agent Setup For Web App Projects

## Context

This setup is for a web app project where:

- A senior developer owns most of the web app implementation.
- I am stronger on backend work with Python and FastAPI.
- Codex is used as a team of specialized agents for planning, implementation support, testing, review, and API contract checks.

## Recommended Roles

| Role | Purpose |
| --- | --- |
| `architect` | Turns requirements into technical plans, API boundaries, data models, risks, and milestones. |
| `frontend_dev` | Builds or reviews UI, routes, components, frontend state, forms, and responsive behavior. |
| `backend_dev` | Helps with FastAPI endpoints, schemas, services, database queries, auth, and background jobs. Optional if I own backend implementation. |
| `api_contract_reviewer` | Checks frontend/backend compatibility: request and response shapes, status codes, auth headers, validation, errors, pagination, and date formats. |
| `tester` | Adds or updates tests, reproduces bugs, runs relevant checks, and verifies key flows. |
| `reviewer` | Reviews final diffs for correctness, security, edge cases, maintainability, and missing tests. |
| `docs_researcher` | Looks up framework or library docs when behavior is uncertain. |

## Best Default Team

For my setup, start with:

```text
Human senior dev      -> owns frontend/product implementation
Me                    -> owns backend/FastAPI decisions
Codex architect       -> plans work and clarifies architecture
Codex backend_dev     -> handles scoped FastAPI implementation tasks when assigned
Codex API reviewer    -> checks frontend/backend contract
Codex tester          -> writes tests and verifies flows
Codex reviewer        -> reviews final changes
Codex researcher      -> checks docs or unfamiliar libraries
```

The most valuable role is usually `api_contract_reviewer`, because many web app bugs happen at the boundary between frontend and backend.

## Project Files

Recommended project structure:

```text
your-project/
  AGENTS.md
  .codex/
    config.toml
    agents/
      architect.toml
      frontend_dev.toml
      backend_dev.toml
      api_contract_reviewer.toml
      tester.toml
      reviewer.toml
      docs_researcher.toml
```

## AGENTS.md Example

```md
# Project Instructions

## Commands
- Install frontend deps: npm install
- Frontend dev server: npm run dev
- Frontend tests: npm test
- Frontend lint: npm run lint
- Backend install: uv sync or pip install -r requirements.txt
- Backend tests: pytest
- Backend lint/format: ruff check . and ruff format .

## Working Rules
- Keep changes small and focused.
- Do not add new production dependencies without asking.
- Prefer existing project patterns over new abstractions.
- After code changes, run the smallest relevant test first.
- For UI changes, verify desktop and mobile layout.
- In final responses, report changed files, commands run, and remaining risks.

## Backend Conventions
- Backend uses Python + FastAPI.
- Use Pydantic models for request and response schemas.
- Keep route handlers thin; put business logic in service modules.
- Prefer explicit status codes and typed response models.
- Validate inputs at schema boundaries.
- Do not change API contracts without updating frontend calls and tests.

## API Contract Rules
- Frontend requests must match FastAPI paths, methods, query params, body schemas, and auth headers.
- Backend responses must match what the frontend expects.
- Error responses should be consistent and documented.
- Date/time values should use a clear agreed format, preferably ISO 8601.
```

## .codex/config.toml Example

```toml
[agents]
max_threads = 4
max_depth = 1
```

## Per-Agent Model And Reasoning

Custom Codex subagents can set different models and reasoning levels. If omitted, the agent inherits from the parent session.

Useful reasoning levels:

```text
minimal | low | medium | high | xhigh
```

Practical mapping:

| Agent                   | Model Strategy           | Reasoning          |
| ----------------------- | ------------------------ | ------------------ |
| `architect`             | Strong model             | `high`             |
| `reviewer`              | Strong model             | `high`             |
| `api_contract_reviewer` | Strong model             | `high`             |
| `frontend_dev`          | Coding model             | `medium`           |
| `backend_dev`           | Coding model             | `medium` or `high` |
| `tester`                | Coding model             | `medium` or `high` |
| `docs_researcher`       | Smaller or cheaper model | `medium`           |

Avoid setting every agent to maximum reasoning. Use high reasoning for judgment-heavy work, and medium for implementation or routine research.

## Agent Examples

### architect

```toml
name = "architect"
description = "Plans architecture, API boundaries, data model, and implementation milestones."
model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "read-only"

developer_instructions = """
Think through architecture carefully.
Focus on tradeoffs, data flow, API contracts, risks, and implementation order.
Return a concrete plan with file areas to inspect or change.
Do not edit files unless explicitly asked.
"""
```

### frontend_dev

```toml
name = "frontend_dev"
description = "Builds UI, routes, forms, frontend state, and responsive behavior."
model = "gpt-5.3-codex-spark"
model_reasoning_effort = "medium"

developer_instructions = """
Implement focused frontend changes.
Follow existing component and styling patterns.
Keep UI dense, usable, and consistent with the app.
Verify responsive layout when UI changes.
Report files changed and validation performed.
"""
```

### backend_dev

```toml
name = "backend_dev"
description = "Implements focused FastAPI backend tasks such as endpoints, schemas, services, validation, and backend tests."
model = "gpt-5.3-codex-spark"
model_reasoning_effort = "medium"

developer_instructions = """
Implement only clearly scoped backend changes.
Use Python and FastAPI idiomatically.
Use Pydantic models for request and response schemas.
Keep route handlers thin and put business logic in service modules.
Preserve existing API contracts unless explicitly asked to change them.
When changing contracts, update frontend callers, tests, and documentation.
Add or update focused pytest coverage when behavior changes.
Report changed files, commands run, and remaining risks.
"""
```

### api_contract_reviewer

```toml
name = "api_contract_reviewer"
description = "Checks frontend/backend API contract compatibility."
model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "read-only"

developer_instructions = """
Check FastAPI routes, Pydantic schemas, frontend API calls, status codes, auth headers, pagination, date formats, and error responses.
Report concrete mismatches with file references.
Do not edit files.
"""
```

### tester

```toml
name = "tester"
description = "Adds and runs tests for backend, frontend, and important user flows."
model = "gpt-5.3-codex-spark"
model_reasoning_effort = "medium"

developer_instructions = """
Focus on validation.
Find the smallest relevant test suite.
Add regression tests when behavior changes.
Run tests or explain why they cannot run.
Report exact commands and results.
"""
```

### reviewer

```toml
name = "reviewer"
description = "Reviews final diffs for correctness, security, maintainability, and missing tests."
model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "read-only"

developer_instructions = """
Review like a senior code owner.
Prioritize real bugs, behavior regressions, security issues, race conditions, and missing tests.
Lead with concrete findings and file references.
Avoid style-only comments unless they hide a real risk.
Do not edit files.
"""
```

### docs_researcher

```toml
name = "docs_researcher"
description = "Looks up official framework and library docs when behavior is uncertain."
model = "gpt-5.4-mini"
model_reasoning_effort = "medium"
sandbox_mode = "read-only"

developer_instructions = """
Verify APIs and version-specific behavior from official docs.
Return concise findings with source links.
Do not edit files.
"""
```

## Prompt Template

```text
We are building a FastAPI + web frontend app.

Use specialized agents:
1. architect: propose backend/frontend boundaries, API contracts, data model, risks, and milestones.
2. frontend_dev: inspect the frontend and propose or implement UI changes.
3. backend_dev: implement scoped FastAPI backend tasks only when explicitly assigned.
4. api_contract_reviewer: verify that frontend calls match FastAPI routes, schemas, status codes, auth headers, and error formats.
5. tester: add or update tests for backend and critical UI flows.
6. reviewer: review the final diff for bugs, security, edge cases, and missing tests.

I will own final backend architecture decisions.
Keep FastAPI changes idiomatic and minimal.

Wait for all agents and summarize:
- implementation summary
- files changed
- tests run
- reviewer findings
- remaining risks
```

## Rule Of Thumb

Use:

- `AGENTS.md` for durable project rules.
- `.codex/agents/*.toml` for role-specific subagents.
- Skills later, only when a workflow is repeated across multiple projects.

## Plan Persistence Rule For AGENTS.md

Add this to `AGENTS.md` if important plans should always be saved as Markdown files:

````md
## Plan Persistence

When working in Plan Mode or when asked to create a plan, always preserve the plan in a Markdown file so it is not lost.

Default location:

```text
docs/plans/
```

Plan file naming:

```text
YYYY-MM-DD-short-task-name.md
```

Example:

```text
docs/plans/2026-07-03-user-auth-api-plan.md
```

Each plan file must include:

- Goal
- Current context
- Assumptions
- Proposed architecture or approach
- Step-by-step implementation plan
- Files or modules likely to change
- Testing and verification plan
- Risks and open questions
- Decision log

If file edits are allowed, create or update the plan file before giving the final answer.

If file edits are not allowed in the current mode, output the full Markdown plan in chat and clearly say that it should be saved to `docs/plans/` once write access is available.

When continuing work from an existing plan, update the same plan file instead of creating a duplicate.
````

Stricter version:

````md
## Required Planning Rule

For any non-trivial feature, refactor, migration, bug investigation, or architecture discussion, create a Markdown plan in `docs/plans/` before implementation starts.

Do not rely only on chat history for important plans.
````

Use `docs/plans/` when plans should be visible to humans and committed with the project. Use `.codex/plans/` only if the plans are mostly Codex-internal notes.
