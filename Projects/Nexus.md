---
created: 2026-10-19
status: active
type: project
tags: [project, nexus, deepvision]
---

# Nexus

## Overview
Shared reference for Nexus analytics settings across projects and sites. The GQ setup is the verified example below; its numeric values must be checked before applying them to another Nexus project. Related: [[Deepvision]] and [[NEXUS - Indoor Position Tracking]].

## Goal / Success criteria
Map spreadsheet labels to the actual pipeline fields, their owning repositories, and their behavior for each Nexus project. Keep confirmed mappings separate from unresolved settings.

## Key contacts
| Name    | Role           | Notes                                                                               |
| ------- | -------------- | ----------------------------------------------------------------------------------- |
| [[Fir]] | Setting review | Discuss whether the screenshot reflects production settings before changing values. |

## Background & context
- Config API repository: `/Users/pai/ws/deepvision-config-api-server`. v1 GQ counter configs live under `configs/v1/counter/{polygon,proximity}/gq/`.
- Tracker-counter repository: `/Users/pai/ws/research-pipeline/deepvision-object-tracker-counter`; counter implementation: `/Users/pai/ws/research-pipeline/deepvision-compute-library`.
- Pre-processor repository: `/Users/pai/ws/deepvision-pre-processor`; GQ analytics configs live under `configs/gq/`.
- The spreadsheet uses business labels such as Traffic, On-Time Greeting Rate, and Quality engagement rate. Those labels are not a direct schema for the counter JSON files.

## GQ setting map (verified example)
- User-confirmed subcategory mapping: **Staff Engagement → `*-engage`**; **On-Time Greeting Rate → `*-engage-loose`**. This identifies the camera variants; spreadsheet parameter values still need independent checks.
| Spreadsheet setting | Implementation | GQ value / behavior | Confidence |
|---|---|---|---|
| Traffic / U-Turn (sec) | `counter/polygon/gq/*-entrance.json` → `config.count_generation_lifespan` → polygon counter `object_count_period_threshold` | 10 seconds on the GQ entrance configs. A tracked object gets a new count generation only when more than 10 seconds have elapsed since its last crossing. | Confirmed |
| Traffic / Exclude Passerby (sec) | Pre-processor `configs/gq/2-reid/2-reid-timespent/store_timespent_no_passerby.json` → first `bin` boundary; no-passerby traffic report reads `_total` | 60 seconds. Visits below 60 have no histogram bucket and are omitted from `_total`; exactly 60 is included. `_true_total` can still include them. | Confirmed for no-passerby report |
| On-Time Greeting Rate / Greet Time (sec) | GQ `*-engage-loose.json` → `config.counter.cross.proximity_count_seconds` | 2 seconds | Confirmed value and camera family |
| On-Time Greeting Rate / Criteria (sec) | Pre-processor `configs/gq/3-reid/staff_engagement_loose.json` → `ontime_engagement_threshold` | 28 seconds, with config note stating `30s - 2s (pipeline threshold)`. | Confirmed relationship to spreadsheet 30 seconds |
| Quality engagement rate / Engagement Time (sec) | Pre-processor `configs/gq/3-reid/staff_engagement.json` → `quality_engagement_duration_threshold` | 15 seconds. Quality is counted when calculated engagement duration is strictly greater than 15 seconds; rate divides quality engagements by sampled visits. | Confirmed |

## Where to change a Nexus parameter
GQ is the example. For another Nexus project, use its own project folder and camera files, then verify the values with Fir against production before editing. The screenshot is not proof of the deployed setting. No config or production values were changed during this investigation.

| Spreadsheet subcategory / parameter | Repository | JSON location within repository | JSON key | GQ screenshot → repository |
|---|---|---|---|---|
| Traffic / U-Turn | `deepvision-config-api-server` | `configs/v1/counter/polygon/gq/*-entrance.json` | `config.count_generation_lifespan` | 10 → 10 sec |
| Traffic / Exclude Passerby | `deepvision-pre-processor` | `configs/gq/2-reid/2-reid-timespent/store_timespent_no_passerby.json`; also `configs/gq/2-reid/2-reid-timespent-profile/store_timespent_no_passerby*.json` for relevant profile outputs | first value of `bin` | 60 → 60 sec |
| Staff Engagement / Posture Angle | `deepvision-config-api-server` | `configs/v1/counter/proximity/gq/*-engage.json` | `config.counter.cross.fan_angle` | 180° → 360° |
| Staff Engagement / Distance Radius | `deepvision-config-api-server` | `configs/v1/counter/proximity/gq/*-engage.json` | `config.counter.cross.proximity_distance` | 1.5 → 2 m |
| Staff Engagement / Engagement Time | `deepvision-config-api-server` | `configs/v1/counter/proximity/gq/*-engage.json` | `config.counter.cross.proximity_count_seconds` | 5 → 7 sec |
| On-Time Greeting Rate / Posture Angle | `deepvision-config-api-server` | `configs/v1/counter/proximity/gq/*-engage-loose.json` | `config.counter.cross.fan_angle` | 360° → 360° |
| On-Time Greeting Rate / Distance Radius | `deepvision-config-api-server` | `configs/v1/counter/proximity/gq/*-engage-loose.json` | `config.counter.cross.proximity_distance` | 1.5 → 2 m |
| On-Time Greeting Rate / Greet Time | `deepvision-config-api-server` | `configs/v1/counter/proximity/gq/*-engage-loose.json` | `config.counter.cross.proximity_count_seconds` | 2 → 2 sec |
| On-Time Greeting Rate / Criteria | `deepvision-pre-processor` | `configs/gq/3-reid/staff_engagement_loose.json` | `ontime_engagement_threshold` | 30 sec → 28 sec; config note says 30 − 2 sec pipeline threshold |
| Quality engagement rate / Posture Angle | `deepvision-config-api-server` | `configs/v1/counter/proximity/gq/*-engage.json` | `config.counter.cross.fan_angle` | 360° → 360° |
| Quality engagement rate / Distance Radius | `deepvision-config-api-server` | `configs/v1/counter/proximity/gq/*-engage.json` | `config.counter.cross.proximity_distance` | 1.5 → 2 m |
| Quality engagement rate / Engagement Time | `deepvision-pre-processor` | `configs/gq/3-reid/staff_engagement.json` | `quality_engagement_duration_threshold` | 15 → 15 sec |

**Change notes:** `fan_angle: 360` disables the facing-direction check; values below 360 enable the facing arc when pose keypoints exist. `proximity_distance` is distinct from `moving_distance_deadzone_radius`. The no-passerby `bin` is a histogram boundary list: its first value excludes shorter visits from `_total`, while the later values define reporting ranges. Quality engagement uses a calculated duration strictly greater than its threshold. If Greet Time changes, recheck the on-time criteria adjustment in the pre-processor.

## Pong config API update (2026-10-19)

The Pong screenshot's Staff Engagement settings map to the four regular `*-engage.json` files in `deepvision-config-api-server/configs/v1/counter/proximity/pong/` (SCSQ and TMBKP, cameras 33 and 34). Set `config.counter.cross.fan_angle` from 360 to 180 degrees and `config.counter.cross.proximity_count_seconds` from 7 to 10 seconds. `proximity_distance` was already 2 m. These values now match the screenshot's Staff Engagement row.

The four `*-engage-loose.json` files already have the screenshot's greeting values (360 degrees, 2 m, 2 seconds); the two entrance JSON files already have `count_generation_lifespan: 10` for Traffic / U-Turn. They were unchanged.

Traffic / Exclude Passerby (60 seconds), On-Time Greeting Rate / Criteria (30 seconds), and Quality engagement rate / Engagement Time (15 seconds) belong in `deepvision-pre-processor`. Three attempted Pong pre-processor JSON files were removed at the user's request; the user will set those values there. No Pong pre-processor config files from this change remain.

Validation: all modified JSON files parsed; checked the four regular engage, four loose, and two entrance values; `git diff --check` passed. No deployment or full pipeline run.

## Pong pre-processor effective date (2026-10-20)

The user added `deepvision-pre-processor/configs/pong/` (53 JSON files). Its three screenshot-related analytics values were already present: no-passerby `bin` starts at 60 seconds, loose engagement `ontime_engagement_threshold` is 28 seconds for the 30-second business criterion after the 2-second proximity threshold, and regular engagement `quality_engagement_duration_threshold` is 15 seconds. The no-passerby report points to the corresponding aggregates.

Changed every Pong `effective_date` from `2026-07-15` to `2026-10-01`: 29 fields across 29 JSON files. Verified that all 53 JSON files parse and all 29 date fields have the requested value. The Pong directory is still untracked in Git; deployment and full pipeline behavior were not tested.

## Pong tourist property mapping (2026-10-20)

Changed all 16 `ethnicity` references across 14 files under `deepvision-pre-processor/configs/pong/` to `est_tourist`, including the two `by_ethnicity` aggregator flags, now `by_est_tourist`. Pong's config API task files already use the `pong_est_tourist` queue, and the pre-processor supports the `by_est_tourist` flag. Verified that all 53 Pong JSON files parse and no `ethnicity` references remain in the Pong directory. No deployment or pipeline test.

## Unresolved values
- Staff Engagement is mapped to regular `*-engage.json` (user-confirmed). Its spreadsheet values—posture 180°, distance 1.5 m, engagement 5 sec—still differ from the GQ counter values `fan_angle: 360`, `proximity_distance: 2`, `proximity_count_seconds: 7`. The meaning or source of those spreadsheet values remains unresolved.
- Quality engagement rate spreadsheet: posture 360° matches regular `*-engage.json` `fan_angle: 360`; distance 1.5 m does not match its `proximity_distance: 2`.
- On-Time Greeting Rate is mapped to `*-engage-loose.json` (user-confirmed). Spreadsheet posture 360° matches loose `fan_angle: 360`; distance 1.5 m is not established by its `proximity_distance: 2`. Loose configs also contain `moving_distance_deadzone_radius: 1.5`, which has a different meaning.
- GQ `staff_engagement.json` uses `*-engage*` and `*-staff*` internal cameras; the aggregator defaults to excluding `*-engage-loose*` for this job. Do not equate the 15-second quality threshold with `proximity_count_seconds`.

## Tasks
- [ ] Discuss the screenshot versus deployed GQ values with Fir before choosing any parameter changes.
- [ ] Resolve Staff Engagement parameter values against pipeline and analytics code; its `*-engage` camera mapping is confirmed.
- [ ] Confirm the intended meaning of 1.5 m for greeting and quality before changing counter configs.
- [ ] For each additional Nexus project, verify its own counter and pre-processor values before reusing this map.

## Progress log
### 2026-10-19
- Updated four Pong config API regular engagement files to 180-degree `fan_angle` and 10-second `proximity_count_seconds`, matching the Staff Engagement screenshot; JSON and diff checks passed. Removed the attempted Pong pre-processor files at user request; its three remaining settings are user-owned. No deployment.
- Expanded the parameter summary table with the exact repository, GQ JSON location, and JSON key for every screenshot setting.
- Documented exact GQ edit locations and current value mismatches for future Nexus parameter changes. User suspects the screenshot may differ from production; discussion with Fir is pending. No config or production values were changed.
- User confirmed Staff Engagement maps to `*-engage` and On-Time Greeting Rate maps to `*-engage-loose`; their differing spreadsheet parameter values remain open.
- Traced the GQ screenshot settings across config API, tracker-counter/compute library, and pre-processor. Confirmed U-Turn 10 seconds, no-passerby 60 seconds, greeting 2 seconds and 30-to-28-second adjustment, and quality engagement 15 seconds. No project code was changed.

## Notes & decisions
- The `bin` list defines timespent histogram ranges. The first boundary of 60 seconds is the no-passerby cutoff for `_total`; later boundaries retain reporting buckets.
- The quality threshold is an analytics rule in the pre-processor, separate from camera proximity counting.
