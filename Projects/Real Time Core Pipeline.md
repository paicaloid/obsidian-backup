---
created: 2026-07-17
status: active
type: project
tags:
  - project
---

## Overview
Real-time successor to the old batch pipeline that processed recorded video at end of day. Connects to live RTSP cameras, detects people/objects, tracks, counts, and publishes events. Focus on security-style products. Runs as a service under the "Neopolis" product (Neopolis is the UI). I own it and started it in Jan 2026 (repo: `/Users/pai/ws/real-time-core-pipeline`; git history there begins 2026-06-04, so earlier work may live elsewhere).

Deployments (per user, 2026-10-15): 1 department store, security: 15 containers face recognition (`object-classifier` repo, branch `face-rec`) + 15 containers anomaly detection (OpenCLIP prompt-based), 150+ cameras. Smart-city POC: trash-bin area status, grounding-dino, 2 containers, 30 cameras.

## Goal / Success criteria
Low-latency live analytics, many cameras per container, managed centrally by [[Real Time Manager Pipeline]].
Achieved: face recognition and anomaly detection passed customer UAT with 90%+ accuracy (2026-10).

## Key contacts
| Name | Role | Notes |
|------|------|-------|
| Vom | Product Owner, Neopolis | Previously owned [[Deepvision]] pipeline |

## Background & context
Architecture (from repo docs): RTSP -> GStreamer (compute-library `GstStreamer`) -> per-camera `CameraHandler` threads with batched frame grabs and state persistence -> `BasePipelineProcessor` (detect YOLOv8 / grounding-dino, track, count via polygon, extract images) -> callbacks (RabbitMQ publisher, MongoDB saver, S3). Admin UI + config CRUD on FastAPI :8000. Run modes: `main.py` counting, `congestion_main.py`, `prompt_based_main.py` (OpenCLIP prompt-based event/anomaly detection with LINE notifier), `snapshot_main.py`.
Managed mode: `/api/managed/v1/*` control API (camera PUT/DELETE/restart, status, sync-report) with API-key or RS256 JWT auth so the Manager can drive many containers.

Commit-log milestones (author: me, 48 of 50 commits, 2026-06 to 2026-10):
- Jun 2026: runtime label confidence weights, camera-specific OpenCLIP labels, label-rule admin UI, perf work on event detector (vectorized decode, prescaled frames), detector resize-strategy A/B/C benchmark, RTX 5060 Ti CPU-spike investigation.
- Jul 2026: managed-mode config APIs and health summary API.
- Aug 2026: API-key auth for managed API, HTTPS support and camera lifecycle hardening, runtime refresh and detector file editor in admin.
- Sep 2026: prompt-based camera ROI cropping, tuning-data capture mode, alerter fixes, grounding-dino detector, snapshot pipeline with event persistence, cron trigger config.
- Oct 2026: snapshot message queue split per image type, ROI and filename alignment, DB saver updates.

## Tasks
- [ ] note about all error found to this note
- [ ] implement http -> https

## Progress log
### 2026-09-11
- after onsite test
	- need to redeploy version that remove `project` parameter from path config
	- implement ROI for prompt-based
		- need to check how crop ROI is support `ymax_setup` or `xmax_setup` (current hard code in production `compute-16`)
		- update managed api to support sync config from [[Real Time Manager Pipeline]]
- after redeploy new version need verify local config is mount to local server
### 2026-08-24
- check all server that cannot ping yet
- change prompt-based to support env-var for delay alert
### 2026-08-04
- need to change http -> https due to security alert from production site
### 2026-07-17
- got error in prompt-based that camera run with wrong codec. Need to write a logic to auto-switch between H264 and H265

## Notes & decisions
<!-- Observations, blockers, trade-offs -->

### 2026-10-26 — Vikunja task organization
- Moved seven direct subtasks of the Real Time Core Pipeline parent task from Pipeline (WIP) into the dedicated Real Time Core Pipeline project. The eighth subtask was already there.
- Kept the parent/subtask relations. Verified all eight tasks in the destination project's List and Kanban views; they appear in the To-Do bucket.
- Used the signed-in Vikunja UI because the saved Keychain API token was unavailable to this session and the shell could not resolve the Vikunja host.

### 2026-10-26 — Label confidence weights guide
- Documented the admin workflow under Label Weights: select a camera, edit Default or Camera Override, save, then reload and check Effective and the status message. Captured and embedded a screenshot from the test admin UI.
- `prompt_based_main.py` starts `EventDetectorPipelineProcessor`. The local config adapter resolves each prompt's camera override before `<default>` from `configs/detector_parameters/open_clip.json`; an unset weight falls back to 1 during decoding. In pooling mode, prompt scores are normalized after weighting.
- The admin save route persists the detector parameters and queues a runtime refresh for the selected camera when active. Verified the wiki text and image survived reload. No detector values or camera configuration changed.

### 2026-10-26 — Weight verification and text cache clarification
- `Save Weights` persists detector parameters; the UI Refresh/File Editor checks stored values. For an active camera, the queued runtime refresh clears cached camera state on the next pipeline loop, and subsequent frames recreate it from config. The queued message alone does not prove the next frame used the weight.
- With tuning capture enabled, new JSONL records include `label_confidence_weights`, allowing direct inspection of the values used for a frame. The detector config in this checkout uses `pointwise` decoding, where prompt logits are multiplied by their weights before confidence calculation.
- `Save Labels and Rebuild Cache` saves Labels rows, rebuilds OpenCLIP text embeddings for the configured prompt set, and clears all event camera states/alerters. It is unnecessary for weight-only edits through the top table. Updated the project wiki and verified it after reload.

### 2026-10-28 — SWIMS subtask organization
- Moved five direct subtasks of the [[SWIMS]] parent task from Pipeline (WIP) to the Real Time Core Pipeline Vikunja project. The sixth subtask was already in the destination.
- Verified all six task project IDs are 189 and each retains parent task 3919; the parent still lists all six subtasks. No blocker.
