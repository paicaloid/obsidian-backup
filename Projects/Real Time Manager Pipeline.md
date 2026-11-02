---
created: 2026-07-14
status: active
type: project
tags:
  - project
---

# Real Time Manager Pipeline

## Overview
Backend + web UI that manages many [[Real Time Core Pipeline]] containers (repo: `/Users/pai/ws/real-time-manager-pipeline`). Central place to define cameras, trackers, counters, polygons and tasks, then push them to running pipeline containers through the pipeline's managed API. Built as a vibe-coding project with company Codex and my Claude: I write all requirements and review everything; a senior developer owns most of the frontend/product UI.

## Goal / Success criteria
Operate fleets of real-time pipeline containers without editing JSON on servers: add/assign cameras, sync config, see health and connection alerts.

## Key contacts
| Name | Role | Notes |
|------|------|-------|
| Senior developer (name TBD) | Frontend / product UI | |

## Background & context
- Stack: Python 3.14, FastAPI, SQLAlchemy + PostgreSQL (Alembic migrations), Jinja web UI, httpx, JWT (RS256) or API-key auth to pipelines, Docker.
- Commit-log milestones (15 commits by me, 2026-07 to 2026-09):
  - Jul 2026: camera / tracker / counter / pipeline / polygon config CRUD APIs and web UI, DB-backed pipeline management, container setup.
  - Aug 2026: sync camera config to a running pipeline without restart, configurable TLS verification, polygon config workflow and enable controls, camera connection alerting, camera CSV export, clickable pipeline links.
  - Sep 2026: camera display name and tags, bulk activation, cross-project camera assignment with bulk assign/unassign.

## Tasks
- [ ] Confirm frontend developer name and exact split of ownership
- [ ] Add scale numbers (containers managed, cameras)

## Progress log
### 2026-10-15
- Documented for CV in [[Work History]].

## Notes & decisions
- Manager repo has `.env`, `pgdata/`, and `.ssh/manager-private.pem` in the working tree; verify they are git-ignored.

### 2026-10-29
- Added `LocalForward 27017 localhost:27017` to `~/.ssh/tunnel_icon` under `tunnel-rtpl-manager`, alongside the existing manager forward. The MongoDB container publishes port 27017 on the same remote host. `ssh -G tunnel-rtpl-manager` shows both forwards; a live MongoDB connection is still unverified. Use `ssh -N tunnel-rtpl-manager` and connect to `mongodb://127.0.0.1:27017` while the tunnel is open.
