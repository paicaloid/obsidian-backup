## Memory
- This vault is the memory store. At the start of a session, read `Memory/Memory.md` (the index) and open the linked notes only when relevant.
- At the end of a session, if anything worth keeping happened, update memory:
  - Add a short dated bullet (`YYYY-MM-DD`) to the best-fitting note: `Memory/Projects.md` or the matching `Projects/` note for project work, `Memory/Decisions.md` for choices and why, `Memory/Preferences.md` for how I like to work, `Memory/Inbox.md` if unsure.
  - Record what changed, what was verified, and what is still open or unverified.
  - Skip trivial chats. Never store passwords, tokens, DB URIs, or ID/financial numbers.
  - Update an existing bullet instead of duplicating it.

<!-- claude-reflect: learned rules (saved from the band; edit freely) -->
## Learned rules
- Remember that camera streams run at 5 fps with no buffer, and *-prompt streams run at 2 fps with no buffer.
- Assume rtpl-container connects to RTSP via GStreamer, decoding on CPU for normal pipelines and on GPU for prompt-based pipelines.
- Record session summaries to the memory notes in this vault at the end of each session when needed.
<!-- end claude-reflect -->
