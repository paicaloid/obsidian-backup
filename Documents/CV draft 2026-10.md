---
created: 2026-10-19
type: career
tags:
  - career
  - cv
status: draft
gdoc: https://docs.google.com/document/d/1G5FrXL4OYP5Oe1arfAlGhSp0i9rUvrFaTuQcPEAhHvI/edit
---

# Nattapon Prasatthong
Machine Learning Pipeline Engineer
Bangkok, Thailand | nattapon.prasa@gmail.com | (+66) 85 141 1568 | github.com/paicaloid

## Summary
Machine learning pipeline engineer with 7 years of backend and ML engineering experience, mainly in Python. Owns production video analytics pipelines that turn CCTV streams from 150+ cameras into counts, events and alerts for retail and venue clients: RTSP ingestion, GPU inference, tracking, counting and storage. Deploys with Docker, RabbitMQ, MongoDB and NVIDIA GPUs, working with an operations team.

## Experience

### OxygenAI, Bangkok, Thailand
Machine Learning Pipeline Engineer, Jun 2025 - Present

**DeepVision video analytics pipeline (owner since early 2026)**
- Maintain, fix and upgrade a multi-stage CCTV analytics pipeline (detector, tracker-counter, image extractor, database saver, task publisher, classifier) on RabbitMQ and MongoDB, and implement new business logic for customers.
- Serves two products: department-store deployments with 100+ cameras on a self-hosted AI server, and single-store deployments with 2-3 cameras per store, computed on company servers.
- Added NVIDIA RTX 50-series support to the detector (TensorRT fisheye, YOLOE, YOLOv8), with engine configs for each GPU generation from 20xx to 50xx.
- Replaced an unmaintained Open3D-based NMS with my own Python package with a C binding. This unblocked the PyTorch upgrade and removed source builds from the detector images.
- Moved image extraction to a GPU-capable NV12 extractor so production servers, where only the detector used the GPU, can offload CPU when it is overloaded.
- Deploy through the operations team with Docker Compose and Ansible.

**Real-Time Core Pipeline and Manager (creator and owner, Jan 2026 - Present)**
- Designed and built a real-time pipeline to replace an end-of-day batch pipeline: RTSP ingestion with GStreamer, YOLOv8 and grounding-dino detection, tracking, polygon counting, and prompt-based anomaly detection with OpenCLIP. Events go to RabbitMQ, MongoDB and S3. It runs as a backend service for the Neopolis product.
- Production at one department store for security: 15 face-recognition containers and 15 anomaly-detection containers across 150+ cameras. Both passed customer UAT with 90%+ accuracy.
- Smart-city proof of concept for waste-bin area status: 2 containers, 30 cameras.
- Built a Manager service (FastAPI, PostgreSQL, Alembic) that controls many pipeline containers: camera, tracker, counter and polygon configuration, config sync to running pipelines without restart, camera connection alerts, bulk camera assignment, and a JWT or API-key secured control API. Developed with AI coding assistants; I wrote the requirements and reviewed all output.
- Benchmarked detector resize strategies and removed CPU spikes on RTX-class GPUs by vectorizing decoding and prescaling frames.

**Other projects**
- Prepared the dataset and labeling tools for an electric-vehicle brand classifier and coordinated training data with the ML engineer; supervised labeling of a shopping-bag dataset.
- Built a road vehicle-congestion detection proof of concept.
- Covered a vacant data engineer role: maintained and fixed the chain from the raw event database (person passes per camera with age and gender) to the aggregator database (traffic by hour and profile) and the TimescaleDB behind the web app.
- Migrated MongoDB from an end-of-life version to a current one. Dump and restore failed, so I wrote a Python tool that exported records to pickle and inserted them into the new database.

### Erudite Engineering Services, Bangkok, Thailand
Senior Software Engineer, Aug 2021 - Feb 2025
- Built an automatic trading system for forward testing strategies: real-time market data, order handling through broker APIs on simulated markets.
- Built a backtesting system with Kedro (data pipeline, strategy runs, experiment tracking) and a Streamlit results dashboard; researched algorithmic trading strategies.
- Built a web app to train and test simple ML models (MinIO, MLflow tracking and registry, prediction APIs).
- Built truck inspection APIs (FastAPI, PostgreSQL, MLflow-registered classification model) on AWS EC2 with Docker.
- Built software to collect agricultural data with APIs for ERP systems, and APIs to collect data from an industry system into an open-source industrial IoT and analytics platform; deployed with Docker on a self-hosted server.

Software Engineer, Aug 2019 - Aug 2021
- Built APIs for an agricultural spraying drone project (management system and drone survey) with Flask and PostgreSQL on AWS Fargate.
- Built daily Value at Risk calculation per asset and daily portfolio risk reports in MongoDB for a risk management dashboard.
- Wrote Arduino software to control a PLC on a sorting machine and deployed a pre-trained model on an Nvidia Jetson Nano as the sorting algorithm.

### Harbin Engineering University, Harbin, China
Computer vision intern, May 2018 - Jul 2018
- Integrated the BlueView SDK with an M900-130 imaging sonar and ROS using C++ publisher nodes; wrote a Python subscriber that converted raw sonar data to grayscale images.

## Skills
- Languages: Python (primary), TypeScript, JavaScript
- ML and video: PyTorch, YOLO (v8, pose, YOLOE), TensorRT, OpenCLIP, grounding-dino, object tracking, GStreamer
- Backend and data: FastAPI, Flask, RabbitMQ, MongoDB, PostgreSQL, MySQL, TimescaleDB, Kedro, MLflow, DVC
- Infrastructure: Docker, Docker Compose, Ansible, AWS (EC2, Fargate), Bitbucket Pipelines, NVIDIA GPU servers

## Education
- Kasetsart University, Bangkok: Master of Electrical, Electronics and Communications Engineering, 2017 - 2019
- Kasetsart University, Bangkok: Bachelor of Electrical, Electronics and Communications Engineering, 2013 - 2017
