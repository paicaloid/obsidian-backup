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
