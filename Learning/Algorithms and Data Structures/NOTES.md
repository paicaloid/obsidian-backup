# Notes: Algorithms and Data Structures

## Pattern plan (NeetCode 150 order, mapped to my systems)
> Practice list: https://neetcode.io/practice (pick the NeetCode 150 list). Do patterns in this order, 3 problems a week.

| Order | Pattern | Tie to my work | Win to aim for |
|---|---|---|---|
| 0 | Big-O and Python costs (list vs dict vs set vs deque) | Any pipeline stage; per-frame loops | Find one O(n^2) or list-scan in a stage and name its cost |
| 1 | Arrays and hashing | Track ID lookup, dedupe of events | Explain why dict lookup keeps per-frame work flat |
| 2 | Two pointers | Merging sorted event timestamps | Merge two timestamped event streams |
| 3 | Sliding window | Rate limiting, frame windows, rolling counts | Redesign the rate-controlled streamer window |
| 4 | Stack and queue (deque) | Frame buffers (5 fps / 2 fps, no buffer); RabbitMQ stage queues | Bounded queue with a drop policy |
| 5 | Heap / priority queue | Top-k detections, scheduling | Top-k confident boxes without a full sort |
| 6 | Binary search | Timestamp lookup in event logs | Find event at time t in O(log n) |
| 7 | Trees and graphs (BFS/DFS) | Camera/zone relationships, shared identity | Group tracks into identities (connected components) |
| 8 | Union-find | Shared identity across counters and videos | Merge track IDs across cameras |
| 9 | Intervals | Polygon zone dwell time, enter/exit events | Compute dwell time per zone |
| 10 | Greedy | NMS (`ml3d`): sort by score, suppress overlaps | Explain NMS as a greedy algorithm and its cost |
| 11 | Basic DP (1D) | Optional | Only if time allows |
| later | Assignment (Hungarian) | SORT / DeepSORT matching | See [[DeepSORT (Deep Simple Online and Realtime Tracking)]] |

## Rate-controlled streamer (review example)
Concepts to cover before critiquing it: token bucket, leaky bucket, sliding window counters, bounded queue, drop-oldest vs drop-newest. Review the streamer code after patterns 3 and 4, then write a short critique note in `lessons/`.

## Weekly rhythm
- Mon/Wed/Fri: one problem each (30-40 min, timed, Python).
- Weekend: one book chapter plus one note tying the pattern to code.
- After each session: add an entry in `learning-records/`.

## Open questions
- (add as they come up)
