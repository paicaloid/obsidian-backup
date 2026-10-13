# Lesson 0001 + math primer: fundamentals confirmed

User read Lesson 0001 ("What DeepSORT Adds to SORT") and the Kalman/Hungarian/Mahalanobis primer
([[0002-kalman-hungarian-mahalanobis]]) back to back, asked no follow-up corrections, and signaled done —
no confusion surfaced on the SORT identity-switch failure mode, the four DeepSORT additions, or the three
underlying math mechanisms.

## Implications
- Treat the four DeepSORT additions (appearance descriptor, Mahalanobis gating, matching cascade, track
  lifecycle) as understood at the *conceptual* level — no need to re-explain what each one is or why it exists.
- Not yet drilled: reproducing the matching cascade's actual control flow (which track ages get matched in
  which order, what happens to leftovers) without looking it up. This is explicitly a stated success criterion
  in `MISSION.md` ("can read and reproduce the DeepSORT matching-cascade algorithm... without looking it up")
  and was only shown once, passively, in the Reference 0001 pseudocode — no retrieval practice on it yet.
- Next lesson: matching cascade deep dive with a worked example and retrieval-practice quiz, per [[MISSION]]
  and the commitment made at the end of Lesson 0001.
