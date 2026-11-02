---
created: 2026-11-02
status: active
type: project
tags: [project]
---

# Vikunja Eisenhower Matrix

- 2026-11-02: Built a local 2×2 board using Vikunja's v2 API, then moved the app outside the Obsidian vault to `/Users/nattapon/ws/vikunja-matrix/`. It now reads open tasks only from [project 165](https://vikunja.oxygenci.com/projects/165) and every nested subproject, and rejects moves for tasks outside that tree. Tasks sync on refresh and every minute; moving a task creates or applies one of four `Eisenhower:` labels while preserving unrelated labels. The server binds to localhost and keeps the API token out of browser storage. The launcher reads a Git-ignored `.env` file when present, with a prompt fallback; `.env.example` documents the format, and Codex did not save the token. Mock API tests passed for nested scope, outside-task rejection, pagination, moves, stale classification, and cross-origin rejection. A live read-only check with the existing `.env` token returned project IDs 165, 189, 190, 191 and 86 open tasks; no live task labels were changed. Run `/Users/nattapon/ws/vikunja-matrix/start.sh` to use it.
- 2026-11-02: Confirmed the vault `.env` token can authenticate to Vikunja: a read-only request for project 165 returned HTTP 200 and `Pipeline (WIP)`. The `/api/v1/user` endpoint returned 401 and `/api/v1/tasks/all?page=1` returned 400 with the same token; use an allowed project endpoint for connection checks. No credentials were recorded.
- 2026-11-02: Added desktop drag-and-drop between the four quadrants and Inbox. It calls the same move path as the accessible Move to menu, preserving the server's project-scope and stale-state checks. A mock browser session showed the board rendering and the shared move path updating a mock task; automated pointer dragging did not complete in that browser session. No live Vikunja task was changed.
