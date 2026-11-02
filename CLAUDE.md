<!-- claude-reflect: learned rules (saved from the band; edit freely) -->
## Learned rules
- Remember that camera streams run at 5 fps with no buffer, and *-prompt streams run at 2 fps with no buffer.
- Assume rtpl-container connects to RTSP via GStreamer, decoding on CPU for normal pipelines and on GPU for prompt-based pipelines.
<!-- end claude-reflect -->
