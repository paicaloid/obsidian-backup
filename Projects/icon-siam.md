---
created: 2026-10-19
status: active
type: project
parent: "[[Neopolis]]"
tags:
  - project
---

# icon-siam

Part of [[Neopolis]].

## Overview
<!-- What is this project and why does it exist -->

## Goal / Success criteria
<!-- What does "done" look like -->

## Server spec
| Component | Spec                                                                  |
| --------- | --------------------------------------------------------------------- |
| CPU       | AMD Ryzen 9 9900X, 12 cores / 24 threads, 1 socket, max 5.66 GHz      |
| RAM       | 60 GiB total ****                                                     |
| GPU       | NVIDIA GeForce RTX 5060 Ti, 16 GiB VRAM (16311 MiB), driver 595.71.05 |

Recorded 2026-10-19.

## Resource usage (prod, neopolis-compute-05)
Measured 2026-10-19 18:09, 1-minute sample. Load average 12.7.

| Resource | Usage                                  |
| -------- | -------------------------------------- |
| GPU busy | avg 79%, max 95%                       |
| VRAM     | max 8.7 / 16 GB                        |
| RAM      | avg 22.4 GB, max 22.5 GB (of 60 GB)    |
| CPU      | ≤ ~12.7 cores (sum of container peaks) |

Containers: 4× real-time-core pipeline (~3.6–4.4 GB RAM each, 83–250% CPU), classifiers (face_rec, reid, gender, age, ethnicity, all-in-one), face/reid vector inference, api_server, node exporters. `classifier_face_rec` peaks at ~320% CPU.

## Reduced-spec question
Can a new project with the same workload run on a 9950X, 32 GB RAM and a 4060 Ti or 5060 Ti 16 GB?

| Resource | Verdict |
|----------|---------|
| CPU (9950X, 16C/32T) | Plenty, ~40% used |
| RAM (32 GB) | OK, ~70% used, ~9 GB headroom. Each extra pipeline adds ~4 GB |
| VRAM (16 GB) | OK on either card |
| GPU: 5060 Ti | OK for the same number of streams, but no room to add more |
| GPU: 4060 Ti | Not recommended. Slower, with ~35% less memory bandwidth, so it would hit 100% and lag |

**Decision:** use a 5060 Ti. GPU is the bottleneck, not RAM. More streams than icon-siam means a stronger GPU, a second GPU, or a lower FPS or resolution per stream.

Open: re-measure at the busiest time of day to confirm the peak.

## Cost per camera (proxy-icon-10)
Source: rtpl-manager camera assignments + 1-minute peaks, 2026-10-19. Simple pipelines run at 5 fps and prompt pipelines at 2 fps, both with no buffer. `managed-1` = icon-10-a and `managed-2` = icon-10-b (confirmed).

| Container          | Cameras × FPS  | Peak CPU | Peak RAM | CPU per camera | RAM per camera |
| ------------------ | -------------- | -------- | -------- | -------------- | -------------- |
| icon-10-a (simple) | 6 × 5 = 30 fps | 250%     | 4.0 GB   | ~42%           | ~0.68 GB       |
| icon-10-b (simple) | 5 × 5 = 25 fps | 232%     | 3.6 GB   | ~46%           | ~0.73 GB       |
| icon-10-a-prompt   | 8 × 2 = 16 fps | 83%      | 3.8 GB   | ~10%           | ~0.49 GB       |
| icon-10-b-prompt   | 9 × 2 = 18 fps | 131%     | 4.3 GB   | ~15%           | ~0.49 GB       |

Rule of thumb:
- **Simple, 5 fps:** ~0.45 CPU core and ~0.5 GB RAM per camera.
- **Prompt, 2 fps:** ~0.12 CPU core and ~0.5 GB RAM per camera.
- **Base cost per container:** ~1.3 GB RAM (from comparing the two simple containers: 6 vs 5 cameras).
- **VRAM is fixed per container, not per camera:** simple (YOLOv8) ~0.6 GB, prompt (OpenCLIP) ~3.1–3.7 GB.
- **GPU busy:** see "GPU per container" below.

### GPU per container
`nvidia-smi pmon` sample (~8 s), with pids mapped to containers.

| Container | VRAM | GPU compute (avg) | NVDEC | GPU per camera |
|-----------|------|-------------------|-------|----------------|
| real-time-pipeline-managed-1 (icon-10-a, 6 cameras) | 608 MB | 27% (17–39%) | none | ~4.5% |
| real-time-pipeline-managed-2 (icon-10-b, 5 cameras) | 606 MB | 3% (0–9%) | none | ~0.6% (anomaly) |
| real-time-prompt-pipeline-managed-1 (icon-10-a-prompt, 8 cameras, 6 active) | 3.1 GB | 10% | 2% | ~1.6% per active camera |
| real-time-prompt-pipeline-managed-2 (icon-10-b-prompt, 9 cameras) | 3.7 GB | 14% | 15% | ~1.6% |
| classifier_reid | 568 MB | 3% | none | n/a |

The pmon total is ~57%. nvidia-smi utilization reported 79% average and 95% max over 1 minute. Size the new server with the higher numbers.

- **Simple, 5 fps:** ~4.5% GPU per camera (from managed-1).
- **Prompt, 2 fps:** ~1.6% GPU per camera. Both prompt containers agree once the 2 warning cameras are excluded.
- **managed-2 anomaly:** it uses CPU like managed-1 (232% vs 250%) but almost no GPU. It may be decoding frames without running inference: stalled cameras, motion or ROI skipping, or errors. Check its logs and camera status. If it should be inferring, the real GPU load is higher than measured.
- **Simple pipelines decode on CPU** (no NVDEC). Moving them to NVDEC would cut CPU.
- **The two prompt containers decode differently:** managed-2 uses NVDEC (15%), managed-1 barely does (2%). Possibly a codec difference (H264 vs H265).

Observations:
- icon-10-b-prompt reuses the 6 `1fa` cameras from icon-10-a. Each container opens its own RTSP stream, so those cameras are decoded twice.
- icon-10-a-prompt has 2 cameras in warning state (`3fb-13z`, `3fb-16z`). If they weren't streaming, the prompt cost per camera is underestimated.

## Concerns for new spec (9950X, 32 GB, 16 GB GPU)
1. **GPU compute is the limit.** Simple cameras at 5 fps cost ~4.5% GPU each, prompt cameras at 2 fps ~1.6%. One simple camera ≈ 3 prompt cameras. The current 5060 Ti averages 79% busy and peaks at 95%. A new server with the same 5060 Ti can carry about the same camera load as proxy-icon-10 (~28 cameras), with no room to grow. A 4060 Ti would fall behind real time.
2. **RAM is OK but has a ceiling.** ~22.5 GB is used now, out of 32 GB. ~9 GB headroom is about 15–18 more cameras by RAM alone, but the GPU runs out first. Each extra prompt container adds ~1.3 GB base RAM plus ~3.5 GB VRAM.
3. **VRAM is fine** for the current mix (8.7 / 16 GB), but more prompt containers use it up fast (~3.5 GB each).
4. **CPU is fine.** The 9950X has 16 cores, more than the current 9900X's 12, and ~40% of the current CPU is used.
5. **Duplicate camera streams** waste CPU. Cameras shared between a simple and a prompt container are decoded twice.

Open:
- Check why real-time-pipeline-managed-2 uses almost no GPU (logs, camera status).
- Consider NVDEC decoding for simple pipelines to cut CPU.
- Re-measure at a busy time of day.
- Collect the other hosts (8 need SSH keys, 2 need a rerun).

## Key contacts
| Name | Role | Notes |
|------|------|-------|
|      |      |       |

## Background & context
<!-- Links to tickets, specs, related work -->

## Tasks
- [ ] 

## Progress log
### 2026-10-19
- 

## Notes & decisions
<!-- Observations, blockers, trade-offs -->

### 2026-11-02 — Local Mongo backup
- Copied the full 2026-11-01 Bangkok day from production `deepvision-icon-siam` to local Mongo using the date-range CLI. The run upserted 2,799,245 records: `customers` 1,408,278; `customers-count` 135,022; `customers-reverse` 1,255,945. Seven other included collections had no matching records. The `customers-feature` collection was excluded and was not created locally. Verified source and local counts for the date range and full index definitions across all ten included collections. Production data was read only.
