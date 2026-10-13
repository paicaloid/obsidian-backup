# Mission: HTTPS deployment with self-signed certs (FastAPI)

## Why
Security team told user to stop deploying `real-time-manager-pipeline` (a FastAPI app at `/Users/pai/ws/real-time-manager-pipeline`, run via `uvicorn`, currently `http://0.0.0.0:8000`, deployed via Docker Compose) over plain HTTP and switch to HTTPS with a self-signed cert. User has no prior TLS/HTTPS background — all previous work was HTTP-only. Goal: understand TLS/cert concepts well enough to actually make this change on the real project, not just in theory.

## Success looks like
- Can explain what TLS does, why HTTP is flagged by security review, and what "self-signed" means vs a CA-signed cert (and when self-signed is acceptable).
- Can generate a self-signed cert/key pair (openssl) and understands what's inside it (CN, SAN, expiry).
- Can configure `uvicorn` (or a reverse proxy in front of it, e.g. nginx/Caddy) to terminate TLS, and knows which approach fits this project's Docker Compose setup.
- Has actually redeployed `real-time-manager-pipeline` reachable over `https://` locally/on the server, and can explain the browser "not trusted" warning that self-signed certs produce and why that's expected here.
- Understands basic cert lifecycle: expiry, renewal, where to store key material safely (not committed to git).

## Constraints
- User is new to TLS/PKI concepts — start from fundamentals, don't assume prior crypto knowledge.
- Must end in a working change to the real project, not just theory.
- Project uses `uv` + Docker Compose; solution should fit that deployment shape.

## Out of scope
- Public CA-issued certs (Let's Encrypt/ACME) — self-signed only, per security team's ask.
- Broader PKI/CA infrastructure setup (internal CA, cert authority management).
- mTLS / client certificates.
