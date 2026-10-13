# Projects
> Source of truth is `Projects/` in this vault. This is a summary; latest status as of 2026-09.

## Active / recent
- [[Real Time Core Pipeline]]: production counting pipeline. TODO: http -> https, ROI for prompt-based, auto H264/H265 switch, redeploy without `project` path param.
- [[Real Time Manager Pipeline]]: FastAPI manager/config API; moving to HTTPS (see Learning/HTTPS...).
- DeepSORT: new tracker so face-rec can snap images on capture, not on line crossing (for Neopolis). Learning workspace in `Learning/DeepSORT...`.
- Frame Selector: auto-pick best image for ReID/classification; removes the `-extra` counter line.
- SWIMS: switch detector to `dino-ground`, verify new classifier, add `object_type` (`object` | `frame`) to DB saver.
- NEXUS indoor position tracking: map image coords to real XY (testing in Kitchen).
- Shopping-Bag Detection: compare against POS data; backup ~14 days of video.
- MCJ: deploy new YOLOPose model; model vs ground-truth counts still far apart (~30 vs ~150 in fitting room).
- Wireless house POC: staff detection by uniform classifier; weak in dark areas.
- PEA, Dusit Park Traffic, Congestion (forbidden area for cars), Neopolis, Deepvision, Internship (temporary): see their notes.

## Local repos
- `D:\git\expense-summary`
