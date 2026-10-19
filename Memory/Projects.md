# Projects
> Source of truth is `Projects/` in this vault. This is a summary; latest status as of 2026-09.

## Active / recent
- [[Real Time Core Pipeline]]: production counting pipeline. TODO: http -> https, ROI for prompt-based, auto H264/H265 switch, redeploy without `project` path param.
- [[Real Time Manager Pipeline]]: FastAPI manager/config API; moving to HTTPS (see Learning/HTTPS...).
- DeepSORT: new tracker so face-rec can snap images on capture, not on line crossing (for Neopolis). Learning workspace in `Learning/DeepSORT...`.
- Frame Selector: auto-pick best image for ReID/classification; removes the `-extra` counter line.
- SWIMS: switch detector to `dino-ground`, verify new classifier, add `object_type` (`object` | `frame`) to DB saver.
- NEXUS indoor position tracking: map image coords to real XY (testing in Kitchen).
- Shopping-Bag Detection: compare against POS data; backup ~14 days of video.
- MCJ: deploy new YOLOPose model; model vs ground-truth counts still far apart (~30 vs ~150 in fitting room).
- Wireless house POC: staff detection by uniform classifier; weak in dark areas.
- PEA, Dusit Park Traffic, Congestion (forbidden area for cars), Neopolis, Deepvision, Internship (temporary): see their notes.

- 2026-10-19 [[Nexus]]: Created a cross-project settings reference using GQ as the verified example. Traced U-Turn 10s, no-passerby 60s, greeting 2s/30s, and quality engagement 15s; Staff Engagement values and 1.5m meaning remain unresolved. No code changes.

- 2026-10-19 [[Nexus]]: Updated the GQ setting map with user-confirmed Staff Engagement → `-engage` and On-Time Greeting Rate → `-engage-loose`; verified the note update. Screenshot value mismatches remain unresolved.

- 2026-10-19 [[Nexus]]: Added a GQ parameter change map across config API and pre-processor; verified edit locations and preserved current value mismatches. Production-versus-screenshot settings await discussion with Fir; no code or production values changed.

- 2026-10-19 [[Nexus]]: Expanded the GQ settings table with each parameter’s repository, JSON path, and key; verified the note. Screenshot-versus-code value mismatches await Fir; no config or production changes.

## Personal projects (WSL, `/home/pai`)
- `finance-tools` (`/home/pai/finance-tools`): active. Personal finance app: import bank statements, Review step, track shared expenses. Supports the retirement-saving goal in [[Goals]].
- `wholesale-pos`: next. Go (hexagonal architecture) + PostgreSQL backend, React/Vue frontend; inventory, orders, invoices. Real project for Mook's father's family-run wholesale shop in Saraburi (no staff besides family). Built together with Mook, no launch date yet.
- Superseded: `expense-tracker` (WSL, migrated into `finance-tools`) and `D:\git\expense-summary` (empty).

## Tooling sessions
- 2026-10-19 [[Codex Setup]]: Configured server-25006 to record project work in a private outbox and added a laptop importer that updates project memory. Verified SSH pull and two importer tests; the outbox has no sessions yet.
<!-- codex-session:2026-10-19-server-25006-memory-sync -->
