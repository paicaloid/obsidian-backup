# DeepSORT Resources

## Knowledge

- [Paper: "Simple Online and Realtime Tracking" — Bewley, Ge, Ott, Ramos, Upcroft (ICIP 2016), arXiv:1602.00763](https://arxiv.org/abs/1602.00763)
  The original SORT paper. Same algorithm family as `SORTTracker` in the codebase (Kalman filter + Hungarian algorithm on IOU). Use for: confirming exactly what SORT does and does not do, before layering DeepSORT on top.

- [Paper: "Simple Online and Realtime Tracking with a Deep Association Metric" — Wojke, Bewley, Paulus (ICIP 2017), arXiv:1703.07402](https://arxiv.org/abs/1703.07402)
  The DeepSORT paper — same first author lineage as SORT (Bewley co-authored both). Reports a 45% reduction in identity switches over SORT via a learned appearance descriptor. **Primary source for this whole mission.** Use for: matching-cascade algorithm, Mahalanobis gating equations, track state machine.

- [GitHub: nwojke/deep_sort (official reference implementation)](https://github.com/nwojke/deep_sort)
  Author's own code. `deep_sort/tracker.py`, `deep_sort/linear_assignment.py`, and `deep_sort/kalman_filter.py` are the canonical implementation of the matching cascade and gating. Use for: reading real code once the paper's algorithm makes sense — this is the closest existing analogue to what a `DeepSORTTracker` in `deepvision.tracker` would need to do.

- [MATLAB & Simulink: "Multi-Object Tracking with DeepSORT"](https://www.mathworks.com/help/vision/ug/multi-object-tracking-with-deepsort.html)
  Vendor documentation, but a clean and accurate secondary walkthrough of the dual-metric (motion + appearance) association step. Use for: a second explanation of Mahalanobis gating + cosine distance if the paper's math is dense on first read.

- [GitHub: roboflow/notebooks — how-to-track-objects-with-deepsort-tracker.ipynb](https://github.com/roboflow/notebooks/blob/main/notebooks/how-to-track-objects-with-deepsort-tracker.ipynb)
  Runnable notebook. Use for: seeing DeepSORT wired up end-to-end with a detector, if/when we want to run it rather than just read it.

### Internal (this codebase)

- [`deepvision/deepvision/tracker/sort_tracker.py`](file:///Users/pai/ws/real-time-core-pipeline/deepvision/deepvision/tracker/sort_tracker.py) — the `SORTTracker` in production today. Ground truth for "what SORT does here," including deviations from vanilla SORT (ROI filtering, fisheye real-world coordinates, bbox normalization).
- [`deepvision/deepvision/tracker/tracker.py`](file:///Users/pai/ws/real-time-core-pipeline/deepvision/deepvision/tracker/tracker.py) — `BaseTracker`, the interface any `DeepSORTTracker` must implement.
- [`deepvision/deepvision/tracker/utils.py`](file:///Users/pai/ws/real-time-core-pipeline/deepvision/deepvision/tracker/utils.py) — `load_tracker()`, where a new tracker class gets registered.
- [`core/object_tracker/object_tracker.py`](file:///Users/pai/ws/real-time-core-pipeline/core/object_tracker/object_tracker.py) — the pipeline-facing wrapper that calls into whichever tracker class is configured.

## Wisdom (Communities)

- No community selected yet. DeepSORT/MOT (multi-object tracking) discussion tends to concentrate on the [MOTChallenge](https://motchallenge.net/) benchmark community and paper-specific GitHub issue trackers (e.g. [nwojke/deep_sort issues](https://github.com/nwojke/deep_sort/issues)) rather than a general subreddit — worth revisiting once implementation starts and real questions (tuning, embedding model choice) come up.

## Gaps

- No resource yet on choosing/benchmarking an off-the-shelf re-identification (appearance embedding) model for the eventual implementation — deferred until the conceptual lessons are done, per `MISSION.md` out-of-scope.
