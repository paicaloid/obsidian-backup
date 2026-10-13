# Prior knowledge: operational fluency with SORT, motivated by a concrete gap

The user already runs `SORTTracker` (IOU cost matrix + Hungarian assignment + Kalman filter motion model) in production via `deepvision.tracker.sort_tracker.SORTTracker`, and understands the pipeline shape (`detect -> tracker -> count`) well enough to identify precisely why it will break under a lineless counting design: without a line-crossing event, count correctness depends on track ID stability through occlusion, which pure-IOU SORT does not guarantee. This is a real engineering-driven motivation, not abstract curiosity.

## Implications
- Skip re-teaching Kalman filter mechanics, the Hungarian algorithm, or "what IOU is" from scratch — start lessons at the SORT/DeepSORT delta, using `sort_tracker.py` as the anchor text.
- The zone of proximal development is: appearance descriptors, Mahalanobis gating, the matching cascade, and track confirmation states — the four things DeepSORT adds on top of SORT's skeleton.
- Lessons should keep citing `sort_tracker.py` line references (e.g. `_associate_detections_to_kalman_boxes`, `iou()`) as the "before" picture, since the user's fluency is with this specific codebase's variant of SORT, not vanilla textbook SORT (which additionally has ROI filtering, fisheye real-world coordinates, bbox normalization not in the original paper).
