---
created: 2026-09-11
status: active
type: project
tags:
  - project
---

# Deepvision

## Overview
Core CCTV video analytics pipeline (repo `/Users/pai/ws/research-pipeline`, 7 Bitbucket submodules under `oxygenai`). Stages: detector -> tracker-counter -> image-extractor -> database-saver -> image-task-publisher, plus `object-classifier` and shared `deepvision-compute-library`. Messaging via RabbitMQ, config from config API server, data in MongoDB. My job: maintain, fix, upgrade, and implement new business logic.

Products running on it:
- **DeepVision**: department store, 100+ cameras, self-hosted AI server, people traffic flow.
- **Nexus**: single store, 2-3 cameras, no server on site (compute at company), customer entrance and staff engagement. See [[NEXUS - Indoor Position Tracking]] for a related effort.

## Goal / Success criteria
Stable production counting; new business logic delivered without breaking stage-to-stage compatibility (`ProcessedStreamData`, saved state, image paths).

## Key contacts
| Name | Role | Notes |
|------|------|-------|
| Vom | Previous pipeline owner | Moved to Product Owner / dev of Neopolis in early 2026 |
| Zen | Asked me to own the pipeline | |
| Few | Operations team lead | Deploys to production |

## Background & context
- Ownership handed to me early 2026; I work solo on code.
- Detector images: yolov8_fisheye, tensorrt_fisheye (per GPU gen 20xx-50xx), yoloe.
- Domain language: `research-pipeline/CONTEXT.md` (shared object identity, engagement).

## Tasks
- [ ] Add performance-review wins and numbers (scale, accuracy, latency)
- [ ] List additional projects built (next sessions)

## Progress log
### 2026-11-02
- Imported the user's tracker image archive as `oxygenai/deepvision-object-tracker-counter:latest` and started its idle worker in the compose replay override. It mounts current tracker/compute source and 2026-10-29 detector pickles read-only, uses isolated RabbitMQ queues, and writes replay output inside its retained container. Compose validation and all four engage counter/tracker/child-camera API checks passed. The worker stays running, imports `/home/user/deepvision`, and has one consumer on an empty replay input queue. No detector files have been published; camera 34's broken frame times still need correction before its replay.
- Imported the user's API image archive as `oxygenai/deepvision-config-api-server:latest`, then started only `api_server` with `/Users/nattapon/ws/compose-files/docker-compose.engage-replay.yml` and its read-only config mount. Compose validation, Gunicorn startup, and HTTP 200 checks for all four updated COM7 engage configs passed; RabbitMQ remained healthy. A separate local image build succeeded after `.env` and `.git` were added to `.dockerignore`, but the running service uses the imported image. This compose stack has no queue workers, so full replay remains pending.
- Created a temporary handoff and implemented COM7 engage floor positions in the original research-pipeline checkout after the user chose latest-observed positions and asked to ignore the prior worktree. On revision, removed the nested floor calibration and used direct camera parameters for the proximity counter and four COM7 configs. Counter tests passed 17 cases; targeted saver tests passed 6. Direct scale `1` also affects proximity eligibility; changes remain uncommitted and packaged stages need compatible compute-library pins. The 2026-10-29 local detector backup covers COM7 cameras 34–37 with 168 shared five-minute file timestamps and usable midday detections, but has no local videos. Sampled camera-34 frame timestamps jump about 95,444 seconds after frame 0 and flatten, so replay must reconstruct its frame times from frame ID and FPS or obtain corrected data before cross-camera timing checks.
### 2026-10-30
- Wrote `/tmp/deepvision-fisheye-handoff-2026-10-30.md` for continuation on another server. It records the existing fisheye projection, engage pair processing, shared-grid calibration conclusion, prototype validation, next steps, and transfer warning for untracked files. No source or production change in this session.
### 2026-10-26
- Extended `prototypes/visualize_fisheye_tracks.py` with optional `VISUALIZE_ENGAGE=1`: run the matching `*-engage` proximity counter on tracked boxes, read its accepted pairs and distance, and use the virtual-grid conversion to display both members’ floor positions. Auto focus chooses a visible accepted pair; `ENGAGE_PAIR`, lead/window frames, and `MAX_FRAMES` control the local render.
- Verified `python -m py_compile`, `git diff --check`, and a 240-frame 2160×1080 GQ MP4 from the 2026-10-25 detector pickle/video. Reopened the MP4 and inspected an accepted pair frame. This is a visual estimate; it reruns tracking without production saved state, so OIDs can differ.
- Restricted random selection by optional `RANDOM_DATE` and `RANDOM_SITE`, configured locally for GQ on 2026-10-25. Verified a matching GQ pair, rendered a 1,800-frame 2160×1080 MP4, reopened its first and last frames, and inspected the visualization.
- Added `INPUT_MODE=random`: enumerate shared S3 dates and fisheye cameras, pair detector `.pkl` and video `.mp4` by filename stem, and load the matching virtual-grid and ByteTracker configs. `RANDOM_CAMERA` can restrict the choice. The local `.env` now selects random mode.
- Scaled rendered output to 1080 pixels per side by default so boxes, OIDs, and floor labels are readable. Random outputs use the selected source stem as their filename.
- Verified live S3 selection and object existence, rendered 1,800 frames from a matched journal camera pair, reopened the 2160×1080 MP4 including its last frame, inspected a frame visually, and checked syntax and diff whitespace. The floor model remains an estimate rather than calibrated ground truth.
### 2026-10-22
- Added `prototypes/visualize_fisheye_tracks.py`: downloads a detector pickle and matching video through PathAdapter, runs the COM7 ByteTracker profile, and renders OIDs with estimated floor positions side by side.
- Added `.env.example` for input paths, output path, camera/tracker configs, and optional S3 credentials; `.env` and generated output are ignored.
- Verified script syntax, local environment parsing, floor-panel rendering, MP4 write/read, and `git diff --check`. Full data run awaits configured source paths and credentials. The floor coordinates use the existing approximate virtual-grid model.
### 2026-10-15
- Fixed detector pipeline to support NVIDIA 50xx GPUs.
- Read through all submodule READMEs; summary in [[Work History]].
### 2026-09-11
- 

## Notes & decisions
<!-- Observations, blockers, trade-offs -->

### 2026-10-28 — COM7 entrance/exit count and is_human
- Verified path: `research-pipeline/deepvision-object-tracker-counter` produces cross/reverse totals in `ProcessedStreamData`; `deepvision-object-database-saver/core/object_database_saver.py` saves them as `count`/`reverse_count` to the task-configured raw count collection (`customers-count` for this flow). The collection name is supplied at runtime, not hardcoded in the saver.
- `deepvision-pre-processor/configs/com7/1/essential_customer_videos.json` configures `EssentialVideosAggregator`: raw `customers-count` → essential `essential_customer_videos`. `core/api/video_collection_api.py` sums `count` and `reverse_count` by camera/day/hour without an `is_human` filter.
- `deepvision-pre-processor/configs/com7/2-area-count/store_area_entrance_exit_by_hour.json` configures `AreaCountAggregator`: essential counts → day/week/month hourly store entrance/exit aggregates. Camera store-tag direction mappings decide whether `cross` or `reverse` contributes to entrance/exit.
- User confirmed classification updates `is_human` after the database saver. In the inspected path, neither the essential-video aggregation nor `AreaCountAggregator` reads it. Therefore `is_human: "no"` does not remove a raw record's existing `count`/`reverse_count` contribution from COM7 entrance/exit totals. The essential aggregation drops `is_human`, so filtering only at the area-count stage cannot work.
- Validation: read the tracker, saver, essential-video query/write, and COM7 area-count config/code; no code or production data changed. Runtime task config and live Mongo records were not inspected.

### 2026-11-02 — Mongo production-to-local export CLI design
- Implemented `deepvision-pre-processor/utils/copy_mongo_to_local.py` after confirming the design: read `<NAME>_URL` from the repo `.env` (URL names the database), require Bangkok start/stop date-times with inclusive/exclusive bounds, filter by `timestamp`, select all or named collections, recreate local collections/source indexes, and upsert by `_id` in 500-record batches. Added CLI documentation and declared `python-dotenv`. Focused mocked checks covered UTC conversion, required/ordered dates, index options, and batching; syntax and diff checks passed. On 2026-11-02, the user changed database selection to always use `deepvision-<project>`; the script and documentation now use that rule. For `pong`, local Mongo ping passed and mocked checks verified the `deepvision-pong` mapping and Bangkok UTC bounds. A live copy for 2026-10-29 00:00 through 2026-10-31 00:00 Bangkok did not start because source authentication failed; no records were copied. Dependencies were installed only into `/tmp` for the check. The user reported the URI works in MongoDB Compass. Both pinned PyMongo 3.11.1 and current PyMongo 4.18.3 returned AuthenticationFailed against the same `.env` URI; dotenv preserves its value and the source is reachable. Awaiting whether Compass uses the exact URI or a saved profile with separate authentication settings. No new production data operation ran.
- Update: Found that a literal `+` in the `PONG_URL` password was decoded as a space by PyMongo; percent-encoding it as `%2B` in `.env` restored authentication. Copied the 2026-10-29 00:00 to 2026-10-31 00:00 Bangkok range from `deepvision-pong` to local Mongo: 145,862 records across five populated collections; six other collections had no matching records. Verified source/local date-range counts and full index definitions match for all 11 collections. No production data was modified.

### 2026-11-02 — MOSH Mongo authentication diagnosis
- `MOSH_AGG_URL` in the untracked pre-processor `.env.temp` reaches Atlas but `ping` returns MongoDB `OperationFailure` code 18. The URI defaults to `authSource=admin`; explicitly trying `deepvision-mosh` also returns code 18. The local `PONG_URL` control likewise returns code 18. This differs from the referenced Prefect export/restore worker session, where `ServerSelectionTimeoutError` came from container network routing. No code or credentials changed. Next: compare the exact URI and authentication settings with a working Compass profile or have the MongoDB administrator verify/reset the MOSH database user.

### 2026-11-02 — MOSH Mongo connection diagnostic
- Inspected `.env.temp` without exposing credentials. `MOSH_AGG_URL` has a literal `+` in its password and no database path or `authSource`. Read-only login attempts failed with `+` encoded and with the user-provided `deepvision-mosh-agg` authentication database. The server's unauthenticated mechanism query reported no SCRAM mechanisms for the URI username in `admin`, `deepvision-mosh`, or `deepvision-mosh-agg`; the same query returned mechanisms for a known working PONG account on its cluster. This suggests the MOSH username or authentication database is incorrect, though a different authentication mechanism remains possible. Awaiting user verification of the account settings. No project file or production data changed.

### 2026-11-02 — Pong is_human traffic config investigation
- Traced the request to group customer traffic by `customer_type: customer` and `is_human: yes`. Pong task configs publish `pong_is_human` for entrance/grid/staff/event and engage camera tasks, but Pong pre-processor JSON configs contain no `is_human` reference. Essential customer and reverse configs group `customer_type`; `ObjectCollectionAPI.query` has no `by_is_human` option, so changing downstream profile `properties` alone cannot propagate that tag. Pong area, re-ID timespent, virtual-grid, and traffic-report profile configs list `customer_type` in `properties`; non-profile count and staff-engagement configs need separate scope review. Investigation only; no product code or config changed.

### 2026-11-02 — Mongo backup collection exclusion
- Updated `deepvision-pre-processor/utils/copy_mongo_to_local.py` to exclude all collection names ending in `customers-feature` from default backup and reject them when explicitly selected. Documented the rule. Mocked CLI checks passed for both plain and prefixed names; syntax and diff checks passed. Existing local copies were not deleted.

### 2026-11-02 — Pong human-only entrance/exit clarification
- User clarified `is_human` should filter which records contribute to entrance and exit counts, not only add a profile dimension. Checked MongoDB `deepvision-pong` sampled schemas: `customers-count` has video-level `count`/`reverse_count` and no `is_human`; individual `customers` records have `is_human`. Pong `EssentialVideosAggregator` reads `customers-count`, and area counts and traffic reports consume its output. A direct `is_human` filter on current count source is impossible. A change to object-based counting or upstream count record generation is required, with count semantics to confirm. No product files changed.

### 2026-11-02 — Pong day store traffic is_human profile field
- Added `by_is_human` grouping to `ObjectCollectionAPI` and enabled it in Pong essential customer and reverse profile configs; added `is_human` to Pong `store_traffic_report` properties so rerunning the essential profiles then `day_store_traffic_report` can emit `data.is_human_yes`. Missing tags become `unknown` to keep them distinct. Corrected a pre-existing stray character in `ObjectCollectionAPI` that prevented Python parsing. Syntax, JSON, and diff checks passed; no live aggregation or data backfill ran. Existing `data.entrance`/`data.exit` still come from video counts and are not human-filtered.
