# COREI — MACHINE SPECIFICATION

## PURPOSE

Defines the baseline hardware and system requirements
for running the Corei trading platform.

This document ensures reproducibility across environments.

---

## SYSTEM PROFILE

- Hostname: core-node
- OS: Ubuntu 22.04 LTS
- Kernel: 5.x
- Architecture: x86_64

---

## HARDWARE REQUIREMENTS

### Minimum (Development Mode)

- CPU: 2 cores
- RAM: 4 GB
- Disk: 20 GB free

### Current System

- CPU: 4 cores
- RAM: 7 GB
- Disk: ~15 GB free

Mode: LOW RESOURCE

---

### Recommended (Stable Dev)

- CPU: 4–8 cores
- RAM: 16 GB
- Disk: 50 GB+

---

### Production Baseline

- CPU: 16+ cores
- RAM: 32–64 GB
- Disk: 200 GB+ SSD/NVMe

---

## STORAGE LAYOUT

/var/corei/
  ├── data/
  ├── logs/
  ├── backups/

---

## NETWORK

- Local IP: dynamic (LAN)
- VPN: WireGuard (installed)
- Ports: managed via future infra

---

## TIME SYNC

- Service: chrony
- Mode: system-wide NTP sync

---

## CONTAINER RUNTIME

- Docker
- containerd

---

## KUBERNETES TOOLING

- kubectl
- Helm

---

## INFRA TOOLING

- Terraform

---

## LANGUAGES

- Python 3.x
- Go 1.22+
- Rust 1.9x+

---

## BACKUP SYSTEM

- Script: ~/corei/scripts/backup.sh
- Method: tar snapshot
- Retention: last 7 backups

---

## EXECUTION MODEL

- Deterministic setup via install.sh
- Idempotent installation
- State-aware execution

---

## NOTES

This environment is suitable for:

✔ Development
✔ Architecture build
✔ Initial platform validation

Not suitable for:

✖ Production deployment
✖ Multi-node scaling
✖ High-throughput execution

---
