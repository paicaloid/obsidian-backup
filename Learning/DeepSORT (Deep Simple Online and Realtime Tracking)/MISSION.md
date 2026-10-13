# Mission: DeepSORT (Deep Simple Online and Realtime Tracking)

## Why
At work (`real-time-core-pipeline`), the object tracking stage runs `SORTTracker` by default ([object_tracker.py](file:///Users/pai/ws/real-time-core-pipeline/core/object_tracker/object_tracker.py), [sort_tracker.py](file:///Users/pai/ws/real-time-core-pipeline/deepvision/deepvision/tracker/sort_tracker.py)). A new pipeline mode, "Lineless counter," removes the counting line entirely — counting will no longer rely on a single crossing event, so it needs track IDs that survive occlusion and gaps far more reliably than IOU-only SORT can provide. The plan is to add a `DeepSORTTracker` (appearance-based re-identification) alongside the existing `SORTTracker` / `ByteTracker` / `OCSORTTracker` classes in `deepvision.tracker`, matching the pattern in [tracker/utils.py](file:///Users/pai/ws/real-time-core-pipeline/deepvision/deepvision/tracker/utils.py). Learning DeepSORT properly, before writing code, is what this workspace is for.

## Success looks like
- Can explain, from memory, every failure mode of `SORTTracker` (IOU-only matching, no appearance model, ID switches after occlusion) that motivates DeepSORT — anchored in the actual `sort_tracker.py` code, not generic textbook SORT.
- Can explain each of DeepSORT's four additions over SORT and *why* it fixes a specific SORT failure: Mahalanobis gating, the cosine-distance appearance descriptor, the matching cascade, and track confirmation states (tentative/confirmed/deleted).
- Can read and reproduce the DeepSORT matching-cascade algorithm (pseudocode from the paper) without looking it up.
- Can sketch a `DeepSORTTracker` class outline that fits the existing `BaseTracker` interface ([tracker.py](file:///Users/pai/ws/real-time-core-pipeline/deepvision/deepvision/tracker/tracker.py)) — this is the bridge point where learning ends and implementation begins.

## Constraints
- Learning happens session-by-session alongside real work; keep each lesson short and tied to a concrete win.
- Ground everything in the existing codebase (`deepvision.tracker`) rather than abstract SORT/DeepSORT tutorials — the user already runs SORT in production and knows it operationally.

## Out of scope
- Frame selection for the "snap" / best-frame-to-count logic in lineless counting — separate topic, tackled after tracking is solid.
- Training or fine-tuning a custom re-identification (embedding) model — start with an off-the-shelf appearance encoder; custom re-id training is a later concern if accuracy demands it.
- ByteTracker / OCSORTTracker internals, except where useful as a contrast to DeepSORT.
