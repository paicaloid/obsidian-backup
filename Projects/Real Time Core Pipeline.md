---
created: 2026-07-17
status: active
type: project
tags:
  - project
---

## Overview
<!-- What is this project and why does it exist -->

## Goal / Success criteria
<!-- What does "done" look like -->

## Key contacts
| Name | Role | Notes |
|------|------|-------|
|      |      |       |

## Background & context
<!-- Links to tickets, specs, related work -->

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
