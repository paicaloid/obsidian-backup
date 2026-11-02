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

- 2026-10-19 [[Nexus]]: Updated four Pong config API `*-engage.json` files to 180-degree posture angle and 10-second engagement time; JSON and diff checks passed. Reverted the three attempted Pong pre-processor configs at user request; its remaining settings are user-owned. No deployment.

- 2026-10-20 [[Nexus]]: Updated all 29 `effective_date` fields in the user-added Pong pre-processor configs to 2026-10-01. All 53 Pong JSON files parsed; all date fields verified. Pong directory remains untracked; no deployment or pipeline test.

- 2026-10-20 [[Nexus]]: Replaced all 16 Pong pre-processor `ethnicity` references with `est_tourist` in 14 JSON files, including `by_est_tourist` flags. All 53 Pong JSON files parse; no old references remain. No deployment or pipeline test.

- 2026-10-22 [[Deepvision]]: Added a local fisheye tracker visualization prototype and .env.example for PathAdapter inputs. Syntax, render, and MP4 smoke checks passed; real detector/video validation awaits source paths and credentials.

- 2026-10-26 [[Deepvision]]: Added random paired S3 input selection for the fisheye OID/floor-position prototype, with automatic camera config lookup and 1080p rendering. Verified a 1,800-frame MP4 and readable labels; floor coordinates remain approximate.

- 2026-10-26 [[Deepvision]]: Added `RANDOM_DATE` and `RANDOM_SITE` filters to the fisheye prototype and set them to GQ on 2026-10-25. Rendered and checked a 1,800-frame GQ MP4; no blocker.

- 2026-10-26 [[Deepvision]]: Extended the fisheye prototype with an engage-pair overlay using the existing proximity and virtual-grid counters. Rendered and inspected a focused 240-frame GQ MP4 with both OIDs, floor coordinates, distance, and accepted state; coordinates remain estimates, and replay OIDs may differ from production state.

- 2026-10-26 [[Vikunja Pipeline WIP]]: Linked 10 Ad-hoc-tagged tasks under the existing AD-HOC parent; verified all 26 matching tasks now have that parent. No remaining blocker.

- 2026-10-26 [[Vikunja Pipeline WIP]]: Created an ICON vehicle-counting container task in To-Do, labeled Ad-hoc and linked under the AD-HOC parent. Verified the saved description and relation in Vikunja; compute placement remains a proposal pending capacity check.

- 2026-10-26 [[Codex Setup]]: Installed the conversation-to-vikunja-task skill. It uses a configured API token, drafts or creates from pasted chats, and asks when project or label placement is unclear. Installed files match the validated draft; the bundled Python validator was unavailable because PyYAML is missing, so YAML and required fields were checked with Ruby.

- 2026-10-26 [[Real Time Core Pipeline]]: Moved seven existing subtasks of the pipeline parent into the dedicated Vikunja project; one was already there. Verified all eight appear in the destination project and remain linked to the parent. No blocker.

## Personal projects (WSL, `/home/pai`)
- `finance-tools` (`/home/pai/finance-tools`): active. Personal finance app: import bank statements, Review step, track shared expenses. Supports the retirement-saving goal in [[Goals]].
- `wholesale-pos`: next. Go (hexagonal architecture) + PostgreSQL backend, React/Vue frontend; inventory, orders, invoices. Real project for Mook's father's family-run wholesale shop in Saraburi (no staff besides family). Built together with Mook, no launch date yet.
- Superseded: `expense-tracker` (WSL, migrated into `finance-tools`) and `D:\git\expense-summary` (empty).

- 2026-10-29 [[Real Time Manager Pipeline]]: Added a MongoDB forward to the existing `tunnel-rtpl-manager` SSH alias: local `127.0.0.1:27017` to the host-published container port `27017`. Verified SSH resolves both manager and MongoDB forwards and local port 27017 is free; live connection was not tested.

## Tooling sessions
- 2026-10-19 [[Codex Setup]]: Configured server-25006 to record project work in a private outbox and added a laptop importer that updates project memory. Verified SSH pull and two importer tests; the outbox has no sessions yet.
<!-- codex-session:2026-10-19-server-25006-memory-sync -->

- 2026-10-26 [[Real Time Core Pipeline]]: Wrote the Change Label Confidence Weights guide in the project wiki using the prompt-based pipeline code and a captured test-admin screenshot. Reloaded the page to verify the guide and image persisted. No runtime settings were changed; no blocker.

- 2026-10-26 [[Real Time Core Pipeline]]: Clarified wiki verification for label weights and explained Save Labels and Rebuild Cache. Corrected decoding wording to pointwise mode; reload confirmed the updated guide persisted. No runtime settings changed.

- 2026-10-28 [[Real Time Core Pipeline]]: Moved five remaining direct subtasks of the SWIMS parent from Pipeline (WIP) into the Real Time Core Pipeline Vikunja project; one was already there. Verified all six are in the destination and still linked to SWIMS. No blocker.

- 2026-10-28 [[Vikunja Pipeline WIP]]: Confirmed all Done-bucket tasks labeled Ad-hoc already had parent task 3917, then moved its 27 direct subtasks into the AD-HOC subproject. Verified every task retained its parent relation and done state; no blocker.

- 2026-10-28 [[Vikunja Pipeline WIP]]: Moved all five direct subtasks of task 4121 into the Pipeline & Aggregator Vikunja subproject. Verified their parent links and done states were preserved; no blocker.

- 2026-10-28 [[Pipeline & Aggregator]]: Created the Mohi Event Zone aggregation DB task from Fir and Pai’s 2026-10-26 conversation. Verified it in To-Do with the PIPELINE label, a 2026-10-28 local start date, and no due date; exact data handoff date remains to be confirmed.

- 2026-10-28 [[Deepvision]]: Documented the verified COM7 count path (tracker/counter → database saver raw `customers-count` → `essential_customer_videos` → hourly store entrance/exit). Classification sets `is_human` later; neither aggregation stage filters on it, so `"no"` does not change these counts. Verified against repository code; runtime task config and live Mongo data remain unchecked.

- 2026-10-30 [[Deepvision]]: Wrote a handoff for continuing fisheye engage-pair floor-position work on another server. Verified code/config references and prototype status; untracked prototype files and separate config checkout must be transferred before work resumes.
