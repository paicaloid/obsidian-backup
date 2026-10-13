# Lesson 0002 (matching cascade trace + animation): no corrections surfaced

User went through the animated cascade trace and the retrieval quiz in Lesson 0002 and moved straight to "next"
with no questions or corrections — same pattern as Lesson 0001. Treating this as confirmation the cascade's
control flow (age-bucketed Hungarian calls, early exit, IOU fallback for tentative/age-1 tracks) is understood
at the level `MISSION.md` asks for ("read and reproduce... without looking it up").

## Implications
- Remaining un-taught piece of the four DeepSORT additions: the appearance descriptor itself — what produces
  `r`, why L2-normalization, why a 100-entry gallery with min-distance rather than a single vector. This became
  Lesson 0003.
- The animated step-player pattern (Lesson 0002) landed well enough to reuse without prompting for Lesson 0003
  (a different diagram — embedding-space scatter — built on the same `assets/step-player.js` +
  `.viz-node`/`.viz-edge`/`.viz-dot` primitives). Keep building new lessons on these shared components rather
  than one-off diagram code.
- After the appearance descriptor, the remaining `MISSION.md` success criterion is sketching a
  `DeepSORTTracker` class outline against `BaseTracker` — that's the next natural lesson once Lesson 0003 is
  confirmed, and is the boundary where this workspace's job ends and implementation begins.
