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
- 2026-11-04 [[Deepvision]]: On server-25006, corrected ReID Transaction's `embed_track_rep` GPU reservation to `0,1`; Compose resolution and diff checks passed. Prepared the Icon Siam migration restart handoff without starting a migration. Reviewed One Siam's canonical rerun: five collections complete, one partial/stale, and 42 not started; a restart needs explicit approval and a retained-conflict policy.
- 2026-11-04 [[Real Time Manager Pipeline]]: Updated the Outline MOSH time-spent handoff. It records the isolated run's zero output from missing `re_uid` and section direction mappings; Timescale, `*-event` `re_uid`, and frontend verification remain follow-ups.
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

- 2026-11-10 [[Deepvision]]: Confirmed `day_section_timespent` in MOSH has `<default>` for building/floor/zone/store because `section` camera tags contain only direction metadata; the aggregator reads parent fields from that same tag, not the sibling `store` tag. Read-only investigation; update section tag data and rerun aggregation if corrected output is needed.

- 2026-11-10 [[Deepvision]]: MOSH local test MongoDB already has six `*-event` camera names; connected staging `deepvision-mosh-agg.cameras-restructure` has the same six as `*-section`, while raw staging event records use `*-event`. No DB change: auto-review blocked credentialed access to staging pending explicit destination approval.

- 2026-11-10 [[Deepvision]]: User clarified no staging DB change. Verified local `deepvision-mosh-agg.cameras-restructure` already has all six MOSH `*-event` names, exactly matching local `deepvision-mosh` `customers` and `customers-reverse` camera names. No DB changes needed or made.

- 2026-11-10 [[Deepvision]]: With explicit user clarification that staging was the target, renamed six MOSH camera names in staging `deepvision-mosh-agg.cameras-restructure` from `*-section` to `*-event` to match raw event camera names. Guarded each update by record ID and prior name; all six modified and connector readback confirmed six `*-event` names. No other fields changed.

- 2026-11-10 [[Deepvision]]: Created a Linux-server handoff for rerunning only MOSH `day_section_timespent` on staging for 2026-11-03. Verified staging still has three pre-rerun rows; local cached amd64 pre-processor import stalled and its container was stopped. Handoff records required staging env, exact command, checks, uncommitted config transfer, missing section parent dimensions, and possible stale `_event_01` rows. No aggregation run occurred.

- 2026-11-10 [[Deepvision]]: Ran MOSH day-only section timespent for 2026-11-03 directly on server-25006 in an isolated `/tmp` checkout using an existing Python virtualenv, no Docker and no Timescale write. Staging gained three `_section_01` rows (BC4 179, FASH 188, MBK 118 visits); three old `_event_01` rows remain. New normalized entrance/exit are zero because day section traffic and embedded essential camera tags still use `_event_01`; parent dimensions remain `<default>` because section tags lack those fields. Updated the Linux handoff with outcome.

- 2026-11-10 [[Deepvision]]: Fixed MOSH staging day section timespent normalization by copying verified day source-traffic totals from old `_event_01` keys to current `_section_01` keys and rerunning the day aggregator. Added exact `day_section_timespent` Timescale pipeline mapping, backed up prior staging Timescale day rows, and synced directly on Linux. Verified three section areas, nonzero entrance/exit, 24 Timescale bucket rows, and no old `_event_01` Timescale rows. Old Mongo rows remain; section tag parent dimensions still default. Updated handoff.

- 2026-11-10 [[Deepvision]]: Corrected MOSH staging section parent dimensions: current `cameras-restructure` section tags lacked building/floor/zone/store although sibling store tags held them. Copied verified parent values into six section tags and three matching day traffic rows, backed up affected Mongo and Timescale rows, then reran 2026-11-03 day section timespent directly on Linux with Timescale sync. Verified 24 TSDB bucket rows with non-default parents and no old event areas; counts and entrance/exit preserved. Old event rows remain in staging MongoDB.

- 2026-11-10 [[Deepvision]]: Clarified MOSH camera provenance: the exact camera document later pasted by the user is in staging `deepvision-mosh-agg.cameras-restructure`. Its private pre-edit backup captured immediately before the parent-field correction has `section.data` keys only `direction`, while the sibling store tag held parent values. This proves the staging state at edit time, not the document’s original creation state; no DB changes in this clarification.

- 2026-11-10 [[Deepvision]]: Reran MOSH `day_section_timespent` for 2026-11-03 to staging TimescaleDB `MOSH_mosh` on the Linux server at user request. Post-run readback of the whole table: 24 bucket rows, zero `<default>` parent dimensions, zero `_event_01` areas, and all rows updated by the rerun. BC4/FASH/MBK totals and traffic values remained consistent.

- 2026-11-10 [[Deepvision]]: Corrected separate staging Timescale `day_section_area_entrance_exit`: prior rows were old `_event_01` areas with default parents because only timespent had been synced. Added exact entrance/exit pipeline mapping, backed up the three old Timescale rows, and transactionally synced the three verified `_section_01` Mongo rows. Whole-table readback: three rows, zero default parents, zero old event areas; entrance/exit preserved. Old event rows remain in staging MongoDB.

- 2026-11-10 [[Deepvision]]: Reviewed staged MOSH push scope: exactly the two day-only section configs and `pipeline-matching.json` with both day section Timescale mappings are staged; staged JSON and diff checks pass. `section` code support is already committed. Database camera tags, corrected historical source/target rows, and Timescale schema are DB state rather than part of this commit; upstream essential snapshots still carry old event names, so a historical area-count rerun can recreate old keys.

- 2026-11-10 [[Deepvision]]: Added two day-only MOSH section Timescale DDL files in `deepvisionappx-adapter` for `day_section_area_entrance_exit` and `day_section_timespent`; no week/month section SQL. The files match staging table columns and indexes, use idempotent create statements, and both executed successfully inside a rollback-only staging Timescale transaction. Files remain untracked for user review/staging.

- 2026-11-10 [[Deepvision]]: Moved MOSH section TSDB schema work to the existing `deepvisionappx-adapter` worktree on `codex/mosh-section-tsdb`. That branch already had day/week/month section SQL and migration tasks; kept the two day tables, made their DDL idempotent, removed four week/month section SQL files and mappings/tasks, and preserved day migration support. Day-only config and JSON checks passed; both day SQL files executed in a rollback-only staging Timescale transaction. Removed the two untracked SQL files previously created on the unrelated Pong branch. Changes remain uncommitted in the MOSH worktree.

## Server-25006 import (2026-10-19 → 2026-11-19)
> Source: `/Users/nattapon/Documents/server-25006` (232 session notes written on the working server). Last imported file: `2026-11-19T05-08-14Z-research-pipeline-uwb-area-switch-handoff`. Next import: only read files newer than that. Credentials and DB URIs were left out on purpose.

- 2026-10-19 → 10-28 [[Real Time Core Pipeline]]: prompt-alert attribution (box on alert image), branch `features/prompt-based-visualize`, Bitbucket PR #7. Design settled over five interview rounds. Same-model occlusion heatmap failed the quality/cost gate, so the design became a box-only primary image. Final design (10-28): pre-upload callback renders box or falls back to the original, then one S3 upload, one Mongo save, one viewer update. Bug: overwriting or deleting the published image key caused `NoSuchKey`; the fix keeps the original key (commit `1546da7`). A stale producer was still writing the old `cross_attribution_images` prefix (found 10-26). Open: staging review of boxes, throughput, queue age and GPU memory before enabling the flag in production.
- 2026-10-29 [[Real Time Core Pipeline]]: investigated production event-queue drops with a Mongo timeout. The affected vehicle task's DB destination matched the timeout; a longer vehicle wildcard in the config API overrides the person wildcard. Advice only, no config changed. Open: verify production connectivity and whether the separate vehicle DB is intentional.
- 2026-11-11 → 11-12 [[Real Time Core Pipeline]]: admin UI usability plan fully implemented (P1 draft retention, delete confirmation and stable polling; P2 feedback, contrast, focus, guidance). Frontend files applied through the core bind mount, no restart. Open: stalled log-stream test and real screen-reader or live-camera checks.
- 2026-11-13 [[Real Time Core Pipeline]]: Hugging Face requests at snapshot startup (Grounding DINO loader). Plan to set `HF_HUB_OFFLINE=1` once the production cache is confirmed complete; not yet verified.
- 2026-10-29 [[Real Time Manager Pipeline]]: pipeline monitoring toggle, Polygon Configs nav, and tracker camera-membership patterns in the UI. The toggle hotfix was pushed to origin/main as `91fc202`. Deploy needs `alembic upgrade head` (Compose startup already runs it).
- 2026-10-20 → 11-13 [[Pipeline & Aggregator]] (`prefect-data-pipeline`, **est_tourist migration**): migrated aggregator `ethnicity` / `background_of_origin` to canonical `est_tourist` (RAS/RAF/RIN/RME/RWE).
  - Built tooling: sequential per-collection runner, extra schemas (event, flat), read-only verifiers (retry, windows, calendar, monthly sampling), Discord failure alerts, and a runbook.
  - One Siam (162 collections): 18 of 21 inconclusive ones confirmed after cleanup; NaN cleanup applied (1,690 docs, 10-28). Flat-alias canary and apply done; canonical rerun status on 11-04.
  - Icon Siam ([[icon-siam]], 183 collections): max-of-pair rules, bounded apply 8–12 Nov, fresh verification 44 clean plus 16 day-report collections with legacy matches. Final status published to the wiki on 11-12/13.
  - Producer: `deepvision-pre-processor` configs for all seven est_tourist projects now emit canonical `est_tourist` and omit `background_of_origin` / `ethnicity`. The Icon-Siam-only producer change was reverted at user request on 11-12.
  - CTW: only the customer-segregation reader was changed. Needs private `CTW_*` URLs; rotate the credentials that were removed from the config.
  - Open: deploy the producer, check a newly written record, run fresh full canonical verification (rolling checks are not a snapshot), and verify canonical count accuracy.
- 2026-10-29 [[Pipeline & Aggregator]]: One Siam building-value migration `siam_paragon` → `siam_paragon_dev` applied for 2025-09-01..04 only (18 daily collections, about 6.5k records plus 80 first). `area` was deliberately left unchanged and no backup was taken (your choice). Weekly, monthly and span aggregates are out of scope; needs dashboard sign-off before expanding.
- 2026-10-19 → 11-16 [[Pipeline & Aggregator]] (Prefect storage): Video, Pickle, Image and Mongo-export V2 flows now stage locally and upload via PathAdapter S3, avoiding the SeaweedFS FUSE mount (ENOTCONN). GQ moved to v2 (10-26). Pong Engage backup/delete deployments were added (10-30/31). CTW 1 AM run uses a date offset. Six image-download deployments moved to V2, with legacy schedules paused. Aggregator Mongo export is bounded by worker count and an 8 MiB chunk cap (recovered One Siam export 10-20). Open: redeploy the Mongo export and image V2 flows, and monitor the next scheduled runs.
- 2026-10-22 → 10-31 [[Nexus]] / Pipeline Orchestrator (unengaged): daily 05:00 Bangkok GQ unengaged batch (tracker checkpoint chain, extractor, SeaweedFS image upload, dev Mongo save, health checks 09:00/21:00). Pong added 10-31: four cameras, `deepvision-pong` dev DB, 12:00 cron, 11 indexes created. The `fisheye2persp` gateway gained `nexus-gq` and `nexus-pong` unengaged project maps and an all-IPv4 VPN allowance (login still enforced).
- 2026-11-09 → 11-13 [[Deepvision]] (research-pipeline dev): queue-based tracker → extractor → saver bridges. Fixed the shared Object loader to keep `relative_coordinate` (the Pong engage run, then the rebuilt-image retest, passed). A separate YOLOv8 detector-override queue (ROI/confidence overrides) was added and documented in the wiki. Fisheye and pose test videos: outputs land under 1975-09-01 because the filenames carry 1975 epoch timestamps. Existing pickles have `use_ffmpeg=false`, which affects S3 crops. The compute-library bump to 2026.11.2 is in the extractor/saver requirements.
- 2026-11-16 → 11-19 [[Nexus]] / [[Deepvision]] (SCSQ engage + UWB): rendered camera 33/34 overlays (tracker boxes, camera XY, projected 2 m floor grid, four UWB tags, Mongo engage points). Camera/UWB XY alignment and tag-to-person identity are unverified. The camera burn-in clock runs about 3–4 s ahead of pipeline time. The CSV `area` says `tmbkp_s01` although the site is SCSQ; a handoff covers a narrow, reversible staging `staff_positions.area` fix (backup and restore test first).
- 2026-11-11 → 11-16 [[DeepSORT]]: offline SORT vs DeepSORT trial on stationary camera `pdp-ci-1f-142`, with side-by-side clip and manifest (not production-verified). Built an annotation web app (port 8765 on the server, SSH tunnel only) with video browser, SORT-track overlay, favorites, same-camera video groups, and stateful group replay so OIDs continue across clips. Still needed: human labeling to find real identity switches. Test case saved: `pdp-ci-1f-176_1794813661` ("Track switching test case").
- 2026-11-04 → 11-19 [[Deepvision]] `deepvision-pre-processor`: production startup failed from dependency conflicts (NumPy/Matplotlib, protobuf/Firestore, TensorFlow). Fixed by commits `510ea751` (requirements pins) and `5b0f78f9` (single-pass Dockerfile resolve, TF 2.15.1). A clean amd64 image passed `pip check` and 31 tests. Open: rebuild and publish the image and deploy; production aggregation not run.
- 2026-11-04 [[Deepvision]] `ReID_transaction`: `embed_track_rep` GPU reservation restored to `0,1` (host has GPUs 0,1,2).
- 2026-10-19 [[Codex Setup]]: Matt Pocock skill conventions set up in the `features/prompt-based-visualize` worktree (local `.scratch/` tracker). The `prefect-mcp` stdio MCP was registered in Codex on the server (2026-11-16).
