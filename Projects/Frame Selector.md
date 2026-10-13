---
created: 2026-09-11
status: active
type: project
tags:
  - project
---

# Frame Selector

## Overview
This feature will help how we select image to use for ReID or Classification. Current we use `-extra` line for get extra image but we will implement this feature to "auto select best image from some criteria"

## Goal / Success criteria
- Remove `-extra` from counter line (reduce workload during setup a new camera)
- Improve  ReID quality
- as a part of [[Real Time Core Pipeline]] for select best image to process (for face recognition)

## Key contacts
| Name | Role | Notes |
| ---- | ---- | ----- |
|      |      |       |

## Background & context
<!-- Links to tickets, specs, related work -->

## Tasks
- [ ] 

## Progress log
### 2026-09-11
- after progress update with team. we will implement based on ReID first follow by
	- extract all images from detection
	- run feature extract for all images
	- run feature matching to find top K for each images
	- find correlation what images that give the best results for ReID >> can find some rules for [[Projects/Frame Selector|Frame Selector]]

## Notes & decisions
<!-- Observations, blockers, trade-offs -->
