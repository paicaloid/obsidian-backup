# Notes: Designing Data-Intensive Applications

## Chapter plan (mapped to my systems)
> Chapter titles are from my memory of the 2nd edition; check against the book's table of contents and fix any mismatch.
> Order is by relevance to the review gaps, not book order.

| Order | Chapter | Tie to my work | Win to aim for |
|---|---|---|---|
| 1 | Defining Nonfunctional Requirements (load, latency percentiles, reliability) | Camera streams at 5 fps / prompt streams at 2 fps with no buffer; 150+ cameras | Write down load parameters and p95/p99 targets for the core pipeline |
| 2 | Stream Processing | RabbitMQ stage queues; rate-controlled streamer; GStreamer ingest | Critique the streamer: overload behavior, backpressure, drop policy |
| 3 | Encoding and Evolution | Pickled state and versioned compatibility in `deepvision-compute-library` | List breaking-change risks and a compatibility rule |
| 4 | The Trouble with Distributed Systems | Multi-container deploy, flaky RTSP, HEVC frame mismatch | A failure-mode list for one pipeline, with monitoring |
| 5 | Batch Processing | Old end-of-day pipeline vs real-time; raw -> aggregator -> TimescaleDB chain | Explain why the chain breaks and where to make it idempotent |
| 6 | Transactions | Event writes to MongoDB; database-saver stage | Check idempotency of saver on redelivery |
| 7 | Storage and Retrieval / Data Models | MongoDB vs PostgreSQL choices; the MongoDB migration | Short note on index and query choices |
| 8 | Consistency and Consensus; A Philosophy of Streaming Systems | Manager pushing config to running pipelines | Reason about config sync and stale state |
| later | Replication, Sharding, Doing the Right Thing | Background | Skim |

## Reading habit
- 1 chapter per 1-2 weeks, about 30-45 min per sitting.
- After each chapter: one note in `lessons/` and one `learning-records/` entry.
- Ask Claude for a short lesson tying the chapter to real code before or after reading.

## Open questions
- (add as they come up)
