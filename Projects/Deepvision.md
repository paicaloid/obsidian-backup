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
### 2026-10-15
- Fixed detector pipeline to support NVIDIA 50xx GPUs.
- Read through all submodule READMEs; summary in [[Work History]].
### 2026-09-11
- 

## Notes & decisions
<!-- Observations, blockers, trade-offs -->
