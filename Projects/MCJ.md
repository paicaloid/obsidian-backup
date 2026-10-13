---
created: 2026-07-17
status: active
type: project
tags:
  - project
---

# Deploy new YOLOPose Model

## Overview
Focus on compare old and new model result. current performance is not match expectation

## Goal / Success criteria
Deploy new model and hope(?) that results will improve

## Key contacts
| Name    | Role | Notes |
| ------- | ---- | ----- |
| [[Fir]] |      |       |

## Background & context
some stats from aggregator not good, hope new YOLOPose model that improve detection will help it

## Tasks
- [x] run full pipeline for MEGBNG 2026-07-05 ✅ 2026-07-22
- [x] run full pipeline for FASH 2026-07-05 ✅ 2026-07-21
- [x] check result of WSGTG 2026-07-29 ✅ 2026-08-06
- [ ] run and check of WSGTG 2026-07-30
- [ ] run full pipeline for WSGTG 2026-07-29 📅 2026-08-07 

## Progress log
### 2026-08-06
- discuss with [[Fir]] about the result. Model count person to fitting room **~30** but GT count as **~150**. so Model is diff to much.
- so we decide that we should run full pipeline (all camera) so it can classify staff and customer
### 2026-08-05
- run data of 2026-07-29 already need to check result
- postpone to run data of 2026-07-30. need to done project [[PEA]] first
### 2026-07-31
- [[Fir]] want to test a new feature. count traffic of customer that enter to fitting room
- so we think that we should test counting first. I got a new counter file as for fitting room already.
- maybe i can run on Friday.
### 2026-07-22
- for future investigate, assign to [[Taro]] ton find value before it average to **average_wait_time**. i think maybe when customer come to store, tracker is switch to dummy and it wait for staff to interact with it. maybe it the cause the make an average too high 
### 2026-07-21
- done running FASH -> tell [[Taro]] to run aggregator
### 2026-07-20
- [[Fir]] ask me for a result but i forgot to run. also it error it **server-25006** so it maybe need to restart server at end of this day
### 2026-07-17
- [[Fir]] tell me that it has a result of 3M criteria but compare to production, error is huge. so i will run result from new model to compare (use 2026-07-05 from MEGBNG and FASH)

## Notes & decisions
<!-- Observations, blockers, trade-offs -->
