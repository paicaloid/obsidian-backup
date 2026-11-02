# Mission: Designing Data-Intensive Applications (DDIA, 2nd ed.)

## Why
The 2026 performance review (Exceeds Expectations, Q2 2025 - Q2 2026) named one gap in technical depth: **algorithm and system design**, with the rate-controlled streamer as the example. A second gap is earlier risk-raising and escalation, which depends on seeing failure modes before they hit production. I am the sole owner of two distributed, streaming, GPU-heavy systems (DeepVision research pipeline; real-time core pipeline + manager), both built on RabbitMQ, MongoDB/PostgreSQL and Docker. DDIA is the standard text for exactly these problems: streams, queues, backpressure, encoding and schema evolution, failure modes, consistency. See [[Work History]] for the review details.

## Success looks like
- Can explain, using my own pipelines as examples, the trade-offs behind: at-least-once vs exactly-once delivery, backpressure vs dropping frames, ordering guarantees, and idempotent consumers.
- Can critique the rate-controlled streamer design: what load parameter and latency percentile matter, what happens under overload, and how it should degrade.
- Can name, before a design review, the 3 most likely failure modes of a new component and what I would monitor.
- Can explain how the pickled-state and entity-model compatibility in `deepvision-compute-library` maps to DDIA's encoding and schema-evolution ideas, and propose one concrete improvement.
- Have written at least 2 short design notes (risk list or design doc) for real work, and raised at least 1 risk early to the team because of this reading.

## Constraints
- Learning runs alongside real work; one short session per chapter, each tied to a concrete win in my codebase (see [[Preferences]]).
- Ground every chapter in `real-time-core-pipeline`, `real-time-manager-pipeline` or the DeepVision research pipeline, not generic examples.
- Record progress in `learning-records/` after each lesson.

## Out of scope
- Chapters on replication, sharding and consensus internals beyond the intuition needed to reason about MongoDB and PostgreSQL in my stack (read for concepts, not depth).
- Building new infrastructure just to practice.
- *The Staff Engineer's Path* (soft-skill gap: ownership, escalation): separate mission, start after about the first half of this one.
