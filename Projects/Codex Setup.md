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
### 2026-11-02
- Set the global Codex `AGENTS.md` to read the Obsidian memory index, save explicit remember requests, and record one dated note before ending each session. Updated the index to cover Codex as well as Claude; verified both instruction files. This is an agent instruction, so abrupt session termination can still prevent a final record.

### 2026-10-19
- Added a project-session outbox rule to the global Codex instructions on server-25006.
- Created `sync_server_25006_memory.py` on the laptop to pull session notes into Memory/Projects.md and the matching Projects note.
- Verified SSH and rsync connectivity, and passed idempotence and invalid-path tests. No server sessions were present to import.
- Sync is on demand: run the laptop importer after server work.

### 2026-10-26
- Installed `conversation-to-vikunja-task` in the local Codex skills directory. It distinguishes review drafts from authorized creation, uses the scoped Vikunja API token, checks for duplicates and project conventions, asks about unclear project/labels, and verifies saved task properties. Ruby YAML/field validation passed and the installed copy matches the draft; skill-creator Python validation could not start because PyYAML is absent.

## Notes & decisions
- Keep the personal vault on the laptop; the server stores only concise project-session summaries.

<!-- codex-session:2026-10-19-server-25006-memory-sync -->
