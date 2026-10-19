---
created: 2026-10-19
type: career
tags:
  - career
  - linkedin
status: published to LinkedIn About on 2026-10-19 ("six years" changed to "more than five years")
---

# LinkedIn update (matches CV in [[CV draft 2026-10]])

## Headline
Machine Learning Pipeline Engineer | Real-Time Video Analytics | Python, GPU Inference, Docker

## About
I build and run machine learning pipelines that turn CCTV video into counts, events and alerts. At OxygenAI I own two production systems: DeepVision, a multi-stage analytics pipeline used in department stores (100+ cameras) and single-store deployments, and a real-time pipeline for security use cases that runs on 150+ cameras at one department store. Its face recognition and anomaly detection both passed customer UAT with 90%+ accuracy.

Recent work:
- Added NVIDIA RTX 50-series support across the TensorRT, YOLOE and YOLOv8 detectors.
- Replaced an unmaintained NMS dependency with my own Python package with a C binding, which unblocked the PyTorch upgrade.
- Moved image extraction to the GPU to offload overloaded production CPUs.
- Built a manager service (FastAPI, PostgreSQL) that configures and monitors many pipeline containers without restarts.

My toolbox: Python, PyTorch, YOLO, TensorRT, OpenCLIP, GStreamer, FastAPI, RabbitMQ, MongoDB, PostgreSQL, Docker and Ansible on NVIDIA GPU servers.

Before computer vision, I spent six years as a backend engineer building trading and backtesting systems, risk reporting, agricultural data and drone platforms, and IoT integrations. That background shapes how I design pipelines: clear stage boundaries, versioned data, and deployments that operations teams can run.

Happy to talk about video analytics, running ML in production, and backend engineering. Let's connect.
