---
created: 2026-10-26
status: active
type: project
tags: [project]
---

# Vikunja Pipeline WIP

## Overview
Task organization for the Pipeline (WIP) project in Vikunja.

## Goal / Success criteria
Keep Ad-hoc-tagged tasks grouped under the existing AD-HOC parent task.

## Key contacts
| Name | Role | Notes |
|------|------|-------|
|      |      |       |

## Background & context
The company Vikunja instance runs v2.5.0, so its REST API is used for task maintenance.

## Tasks
- [x] Link Ad-hoc-tagged tasks under the AD-HOC parent.

## Progress log
### 2026-10-26
- Added the parent relation to 10 matching tasks that lacked it. Verified each new link; all 26 matching tasks now have the intended parent.

- Created [ICON vehicle-counting container task](https://vikunja.oxygenci.com/tasks/4332) in To-Do with the Ad-hoc label and AD-HOC parent. Scope: vehicle detection/counting plus vehicle type, brand, color, and LPR classifiers; proposed compute-11 vehicle / compute-12 person + prompt placement requires GPU capacity and service-impact review. Vom will set the Manager counting line after provisioning. Verified task details and parent relation in Vikunja.

### 2026-10-28
- Confirmed every Done-bucket task labeled Ad-hoc in Pipeline (WIP) already had [AD-HOC parent task 3917](https://vikunja.oxygenci.com/tasks/3917); no new parent links were needed.
- Moved all 27 direct subtasks of that parent into the [AD-HOC subproject](https://vikunja.oxygenci.com/projects/190/1363). The parent remains in Pipeline (WIP).
- Verified each moved task has project ID 190, retains parent task 3917, and has the same done state; the parent still lists all 27 children. No blocker.

- Moved all five direct subtasks of [task 4121](https://vikunja.oxygenci.com/tasks/4121) to the [Pipeline & Aggregator subproject](https://vikunja.oxygenci.com/projects/191/1370). Verified project ID 191, parent relation 4121, and unchanged done state for each task; the parent still lists all five. No blocker.

## Notes & decisions
- Used a scoped API token kept in macOS Keychain. Creating task relations required the Task Relations Create permission.
- No remaining blocker for this task organization change.
