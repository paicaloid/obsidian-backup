# Baseline: no prior TLS/HTTPS knowledge

User stated they are new to TLS/HTTPS/self-signed certs — all prior deployment work at `real-time-manager-pipeline` was plain HTTP via uvicorn/Docker Compose. Start lessons from first principles (what TLS solves, cert basics) before touching openssl commands or uvicorn config. Matters because it sets floor for lesson 1: assume zero PKI vocabulary (CN, SAN, CA, cert chain all unknown).
