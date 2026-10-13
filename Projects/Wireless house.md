---
created: 2026-07-17
status: active
type: project
tags:
  - project
---

# POC

## Overview
POC area for detect staff from all customer and remove them from total traffic

## Goal / Success criteria
- Display on dashboard

## Key contacts
| Name   | Role | Notes |
| ------ | ---- | ----- |
| [[Ya]] | ??   |       |

## Background & context
Right now we detect staff by using staff-uniform (using object-classifier like jacket >> staff wear this)

## Tasks
- [ ] Compare result to labeler ( 📅 2026-07-21 )
- [ ] add to production pipeline
- [ ] check counting result first

## Progress log
### 2026-08-11
- weak result for camera in the dark area. need a new solution to test
	- new counter line that change it detect at the brighter area
	- train weight for each camera
### 2026-08-05
- run all result of 2026-07-04 to 2026-07-09.
- labeler count staff more than model but from i check, i think we count person less than actual. so i think we need to  investigate with [[Ya]] is model missing count is real ?
### 2026-07-21
- result for door A (darker area) is not that good. need to improve
- [[ya]] told me to run data for date 2026-07-20
### 2026-07-20
- [[Ya]] need a result before ( 📅 2026-07-22 ), so i think i will need to test run tomorrow (if possible)
- zen used all data for training. so we have to used new data from tomorrow for testing model

## Notes & decisions
<!-- Observations, blockers, trade-offs -->
![[Pasted image 20260819113554.png]]

![[Pasted image 20260819114432.png]]