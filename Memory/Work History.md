---
created: 2026-10-13
type: career
tags:
  - career
  - cv
---

# Work History
> Imported 2026-10-13 from the old CV (`nattapon_resume_backend.docx`, Google Doc). Record all work here first, then build the new CV from this note.
> Updated 2026-10-13: current role added. Project-level detail lives in [[Projects]] and `Projects/`.

## Skills (old CV)
- Primary: Python
- Also: TypeScript, JavaScript, Golang
- Databases: MySQL, PostgreSQL, MongoDB
- Tools: Docker, FastAPI, Flask, DVC, MLflow, Kedro

## OxygenAI, Bangkok, Thailand
### Machine Learning Pipeline Engineer, Jun 2025 - Present
- Design, implement, deploy and maintain machine learning pipelines.
- Real-time video analytics projects (counting, re-id, face recognition); see [[Projects]] and `Projects/`.

#### Responsibility 1: DeepVision research pipeline (owner since early 2026)
> Detail: [[Deepvision]]. Code: `/Users/pai/ws/research-pipeline` (orchestrator repo + 7 submodules). Added 2026-10-15; more projects and performance-review results to come in later sessions.
- Ownership: previous owner "Vom" moved to Product Owner / dev of product "Neopolis" in early 2026; "Zen" asked me to take ownership. Solo engineer on this pipeline. Production deploys go through the operations team led by "Few".
- Scope: maintain, fix bugs, upgrade, and add new business logic to the multi-stage CCTV video analytics pipeline behind the "DeepVision" product.
- Products served by this pipeline:
  - **DeepVision**: department-store scale, 100+ cameras, self-hosted AI server; focus on people traffic flow.
  - **Nexus**: single-store scale, 2-3 cameras per store, no on-site server (computed on company servers); focus on customer entrance and staff engagement.
- Pipeline stages (each its own repo, container, RabbitMQ queue): detector -> tracker-counter -> image-extractor -> database-saver -> image-task-publisher, plus `object-classifier` and a shared `deepvision-compute-library` (entity model, pickled state, versioned compatibility).
- Stack: Python, RabbitMQ, MongoDB, Docker / Docker Compose, Ansible (deployment), NVIDIA GPUs, YOLOv8 / YOLO-pose / YOLOE, TensorRT, Bitbucket Pipelines.
- Done:
  - Fixed and upgraded the detector service to support NVIDIA 50xx-series GPUs (per-architecture TensorRT engine configs for 20xx / 30xx / 40xx / 50xx; TensorRT API migration; on-demand model weight download).
- Work in progress (per user, not finished): lineless counting tracker (DeepSORT), engagement / never-engaged analytics, shared object identity across counters and videos (domain model in repo `CONTEXT.md`).
- CV rules: customer names anonymous (use "retail and venue clients"). Nexus staff-vs-customer uses classifier-based staff detection. CV target: 2 pages, English only.
- TODO from user: performance review results (quantified wins), scale numbers, further successful projects.

#### Project 2: Real-Time Core Pipeline and Manager (owned and created, from Jan 2026)
> Detail: [[Real Time Core Pipeline]], [[Real Time Manager Pipeline]]. Code: `/Users/pai/ws/real-time-core-pipeline`, `/Users/pai/ws/real-time-manager-pipeline`. Added 2026-10-15.
- Role: sole owner and creator; designed and built a real-time upgrade of the old pipeline that processed recorded video at end of day. Runs as a backend service for the "Neopolis" product (UI built by other team members).
- Function: connects to live RTSP cameras, detects and tracks people/objects, counts by polygon zones, and publishes events and images; security-focused use cases.
- Deployments (anonymized):
  - 1 department store, security: face recognition on 15 containers and anomaly detection on 15 containers, 150+ cameras total, in production.
  - Smart-city proof of concept: waste-bin area status detection, 2 containers, 30 cameras, using grounding-dino (open-vocabulary detector).
- Result: face recognition and anomaly detection both passed customer UAT with 90%+ accuracy.
- Face recognition lives in repo `object-classifier`, branch `face-rec` (run on the server from the main repo); anomaly detection = OpenCLIP prompt-based mode of the core pipeline.
- Core pipeline (Python, GStreamer, PyTorch/YOLOv8, OpenCLIP, grounding-dino, FastAPI, RabbitMQ, MongoDB, S3, Docker, GPU):
  - Per-camera threaded ingestion with batched frame grabs, pluggable processor stages (detect, track, count, extract), event callbacks.
  - Prompt-based event/anomaly detection with OpenCLIP: per-camera label rules, confidence weights, ROI cropping, alert notifications, tuning-data capture.
  - Snapshot pipeline with event persistence and per-image-type queues; cron-triggered config.
  - Managed-mode control API with API-key / RS256 JWT auth, HTTPS, health summary.
  - Performance engineering: A/B/C benchmark of detector resize strategies, vectorized decode, prescaled frames, CPU-spike investigation on RTX 5060 Ti.
- Manager (Python 3.14, FastAPI, SQLAlchemy, PostgreSQL, Alembic, Docker):
  - Central control plane for many pipeline containers: camera/tracker/counter/polygon/task config CRUD, push and sync config to running pipelines without restart, connection alerting, CSV export, bulk camera assignment across projects.
  - Built AI-assisted (vibe coding) with company Codex and Claude: I write requirements and review all output; frontend by a senior developer.
- Open for CV: latency/throughput gains, exact start of work (repo history begins 2026-06-04, user says Jan 2026), face-rec details (model, DB, accuracy).

#### Other work at OxygenAI (from performance review, period Q2 2025 - Q2 2026, title "AI Pipeline Engineer", added 2026-10-18)
- Rating: Exceeds Expectations. Reviewer called me a key contributor to multiple projects. (Salary outcome in the review is private; keep off CV.)
- Key assignments:
  - Developed the real-time pipeline (see Project 2).
  - Proof of concept for a road-traffic customer ("Talaad 4MM"; anonymize on CV): detect vehicle congestion in a specific road section (congestion mode of the real-time pipeline).
  - Acted as temporary Data Engineer (fix bugs and maintain only, no new features) while the role was vacant. Context: my pipeline writes a timestamped event for each person passing a camera, with metadata (age, gender), into a "Raw" database; the company's Data Engineer builds an "Aggregator" database from it (traffic by hour and by profile), then a TimescaleDB for the web app. I maintained and fixed that raw -> aggregator -> TimescaleDB chain for the BD team.
  - Database migration: old MongoDB version (end of life) to a new version. mongodump/restore failed, so I wrote a Python tool that exported records to pickle and inserted them into the new database; also helped ML team with data dumps.
  - NV12 image extractor: in production only the detector used the GPU while all other stages ran on CPU, overloading the CPU. Supported the GPU-capable NV12 image extractor so it can be switched to GPU when CPU is overloaded, reducing CPU workload.
  - Added NVIDIA RTX 50xx GPU support across detector modules: TensorRT fisheye, YOLOE, YOLOv8.
  - NMS isolation: the original NMS (Open3D-based) repo was unmaintained and blocked upgrading PyTorch. Updated it and built my own Python package with a C/C++ binding (`ml3d`, distributed as a wheel), removing the Open3D dependency and source builds from detector images and unblocking newer PyTorch / CUDA.
  - Investigated and fixed frame mismatch on HEVC streams (details not recalled; keep as one short line or omit).
  - Electric-vehicle brand classification: prepared the dataset and labeling tools for labelers, and coordinated with the ML engineer to prepare training data (a normal car-brand classifier already existed; EV brands were the new focus). Also supervised labeling of a shopping-bag dataset.
- Strengths noted by reviewer: adaptability (moved from NMS/Open3D work to NV12 pipeline), resourcefulness (switched compute machines to meet a deadline), cross-team support, documented test steps and results in wiki, built a configuration page for the real-time pipeline unprompted, reliable code that rarely fails and owns fixes.
- Improvement areas (private, not for CV): more proactive ownership and risk-raising, deeper algorithm / system design (rate-controlled streamer algorithm quality), earlier escalation of blockers, more engagement beyond immediate project.
- Source images: performance review photos shared in session on 2026-10-18.

## Erudite Engineering Services, Bangkok, Thailand
### Senior Software Engineer, Aug 2021 - Feb 2025
- Built automatic trading system to forward test strategies: real-time market data, process and send market orders through broker APIs on simulated markets.
- Researched algorithmic trading strategies (finance, technical analysis, ML).
- Built backtesting system: Kedro (data pipeline, run strategy, track experiments), streamlit dashboard for results.
- Designed and built structured note system: daily recommended note with predefined parameters, and backtesting for hedging.
- Built web app to train and test simple ML models: MinIO, MLflow (tracking, registration), prediction APIs.
- Built software to collect agricultural data, with APIs for ERP systems; deployed on self-hosted server with Docker.
- Built truck inspection APIs: FastAPI, PostgreSQL, MLflow registered classification model, AWS EC2 with Docker.
- Built APIs to collect data from an industry-specific system, integrated with an open-source Industrial IoT and data analytics platform.

### Software Engineer, Aug 2019 - Aug 2021
- Built APIs for agriculture spraying drone project (management system, drone survey): Flask, PostgreSQL, AWS Fargate.
- Built daily Value at Risk (VaR) calculation per asset, daily risk reports for portfolios stored in MongoDB, shown on Risk Management Dashboard.
- Built Arduino software to control PLC with sorting machine; deployed pre-trained model on Nvidia Jetson Nano as sorting algorithm.

## Harbin Engineering University, Harbin, China
### Internship, computer vision, May 2018 - Jul 2018
- Integrated Linux BlueView SDK with Imaging Sonar M900-130 and ROS: publisher nodes in C++.
- Python program to subscribe to raw sonar data from ROS and convert to grayscale image.

## Education
- TAIST-Tokyo Tech and Kasetsart University, Bangkok: Master of Engineering, Information and Communication Technology for Embedded Systems, graduated 2019 (per JobsDB profile; old CV said Master of Electrical Electronics and Communications Engineering, Aug 2017 - Aug 2019)
- Certification: AWS Cloud Practitioner (expired Dec 2025)
- Kasetsart University, Bangkok: Bachelor of Electrical Electronics and Communications Engineering, Jun 2013 - Jun 2017

## Contact (old CV)
- Name on CV: Nattapon Prasatthong
- Email: nattapon.prasa@gmail.com, phone (+66) 85 141 1568, github.com/paicaloid
- Note: old CV had a stray second contact block (Kanokpol Kulsri) from a template; ignored.
