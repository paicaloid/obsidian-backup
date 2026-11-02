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
