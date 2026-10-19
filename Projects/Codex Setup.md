---
created: 2026-10-19
status: active
type: project
tags: [project]
---
# Codex Setup

## Overview
Configuration and workflows for Codex across laptop and server.

## Goal / Success criteria
Project changes and bug fixes from server sessions reach the laptop Obsidian memory.

## Progress log
### 2026-10-19
- Added a project-session outbox rule to the global Codex instructions on server-25006.
- Created `sync_server_25006_memory.py` on the laptop to pull session notes into Memory/Projects.md and the matching Projects note.
- Verified SSH and rsync connectivity, and passed idempotence and invalid-path tests. No server sessions were present to import.
- Sync is on demand: run the laptop importer after server work.

## Notes & decisions
- Keep the personal vault on the laptop; the server stores only concise project-session summaries.

<!-- codex-session:2026-10-19-server-25006-memory-sync -->
