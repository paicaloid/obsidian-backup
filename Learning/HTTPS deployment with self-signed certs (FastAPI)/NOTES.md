# Notes

## Project context (real target for this mission)
- Repo: `/Users/pai/ws/real-time-manager-pipeline`
- FastAPI app, entrypoint `main.py` → `uvicorn.run("manager.main:app", host="0.0.0.0", port=8000, reload=True)`
- Deployed via `docker-compose.yml`, service `manager`, port `8000:8000`, `uv`-managed deps
- `Dockerfile` based on `astral/uv:python3.14-bookworm-slim`
- Checked `manager-public.pem` — it's a bare RSA public key (`-----BEGIN PUBLIC KEY-----`), not an X.509 cert. Unrelated to TLS/HTTPS mission, likely used for app-level signing/encryption elsewhere in the app. Ignore for this mission.
- Task: move this deployment from `http://` to `https://` with self-signed cert, per security team request

## Preferences
- (none stated yet)
