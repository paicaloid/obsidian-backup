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

### 2026-11-02
- Vikunja's published feature list offers List, Gantt, Kanban, and Table views, with no built-in Eisenhower Matrix view. A four-bucket Kanban board can approximate the four importance/urgency categories, but it displays columns rather than a 2×2 grid.
- Scoped task upkeep to project 165 and descendants 189, 190, and 191. Verified all 110 tasks include Nattapon (`nattapon_p`, user 45) as an assignee. Set the 3 completed tasks with unset starts (3730, 4068, 3700) to midnight Bangkok time on their creation dates; 18 open tasks still have no start date. Vikunja task updates require a full payload to preserve fields: the initial partial update of task 3730 reset its completion timestamp from 2026-09-11T03:57:34Z to 2026-11-02T05:50:27Z and changed its description field to empty; the completed state was restored, but the original timestamp could not be restored through the API and the prior description value was not captured. Later full-payload updates preserved checked fields.
- Updated the existing "My Task" Kanban view at `/projects/-75/549` to "Open tasks by project": it excludes completed tasks and limits the view to project 165 and its three current subprojects. Verified 86 open tasks in four non-overlapping buckets (Pipeline 53, Real Time Core 12, AD-HOC 10, Pipeline & Aggregator 11). The saved filter itself still includes other projects in its other views; no users or teams are currently shared on the saved-filter project, so direct team-lead access needs their Vikunja identity.
- Created [AD-HOC task 4417](https://vikunja.oxygenci.com/tasks/4417) for local aggregator `is_human` handling and rerunning 2026-10-23 through 2026-11-01. Assigned Nattapon, set a 2026-11-02 Bangkok start and 2026-11-04 end-of-day deadline, and recorded conditional production, TimescaleDB, and Hua dashboard follow-ups. Verified the saved task fields through the API.
- Created [One Siam migration report task 4421](https://vikunja.oxygenci.com/tasks/4421) in Pipeline & Aggregator, assigned Nattapon and linked it under migration parent 4121. It covers reporting on the `ethnicity` → `est_tourist` migration and inspecting the `Non` database on server-25006 for remaining migration needs; no database changes were requested or made. Set the start to 2026-11-02 Bangkok time and left the deadline unset. Verified task fields and parent link.
- Prepared a delay comment for [MOSH Event Zone aggregation task 4349](https://vikunja.oxygenci.com/tasks/4349): MongoDB authentication is failing; verify MOSH credentials and authentication database, then retry before continuing the aggregation DB setup and handoff. The vault `.env` API token returns HTTP 401 for Task Comments and the in-app browser is not signed in, so the comment was not posted. Retry when comment-capable Vikunja access is available.
