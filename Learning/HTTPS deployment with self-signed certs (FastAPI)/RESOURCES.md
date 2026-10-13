# HTTPS / Self-Signed Cert Deployment Resources

## Knowledge

- [Mozilla: "Transport Layer Security (TLS)"](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security)
  Plain-language overview of what TLS does and why. Use for: foundational "why HTTPS" lesson.
- [OpenSSL Cookbook — Feisty Duck (free)](https://www.feistyduck.com/library/openssl-cookbook/)
  Practical, accurate reference for `openssl` cert generation commands. Use for: generating self-signed cert/key, understanding CN/SAN/expiry fields.
- [Uvicorn docs: "Running with HTTPS"](https://www.uvicorn.org/deployment/#running-with-https)
  Official, authoritative for `--ssl-keyfile` / `--ssl-certfile` flags. Use for: wiring a self-signed cert directly into uvicorn.
- [nginx docs: "Configuring HTTPS servers"](https://nginx.org/en/docs/http/configuring_https_servers.html)
  Authoritative for reverse-proxy TLS termination pattern. Use for: deciding uvicorn-native TLS vs proxy-terminated TLS in the Docker Compose setup.
- [Caddy docs: automatic HTTPS / manual certs](https://caddyserver.com/docs/automatic-https)
  Simpler reverse-proxy alternative to nginx. Use for: comparing proxy options if nginx feels heavy.

## Wisdom (Communities)

- Not yet explored — user hasn't stated a preference. Will surface r/sysadmin or r/selfhosted if user wants real-world deployment war-stories on cert management.

## Gaps

- No resource yet on safely handling key material in Docker Compose (secrets vs bind-mounts vs env). Fill in during the deployment lesson.
