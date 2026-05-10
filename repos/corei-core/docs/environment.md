# COREI — ENVIRONMENT CONFIGURATION

## PURPOSE

Defines the runtime environment setup and toolchain
used for developing and running the Corei platform.

---

## ROOT DIRECTORY

~/corei/

---

## REPOSITORY STRUCTURE

~/corei/repos/
  corei-core/
  corei-infrastructure/
  corei-sdk/
  corei-services/
  corei-schemas/

---

## SCRIPT LAYER

~/corei/
  install.sh
  scripts/
    setup-repos.sh
    backup.sh

---

## GITHUB

- Organization: corei-org
- Access: authenticated via gh CLI

---

## TOOLCHAIN

### System Tools

- git
- curl
- wget
- jq

### Container

- Docker
- containerd

### Kubernetes

- kubectl
- Helm

### Infra

- Terraform

---

## LANGUAGES

- Python (primary scripting)
- Go (system components)
- Rust (high-performance components)

---

## CONFIGURATION APPROACH

- Config stored centrally (future Stage 3A)
- No hardcoded values in services
- Environment-based configuration

---

## EXECUTION PRINCIPLES

- All setup via scripts
- No manual environment setup
- Idempotent execution
- State-driven installation

---

## NETWORK

- Local LAN environment
- VPN ready (WireGuard installed)
- External exposure controlled later via ingress

---

## STORAGE

- Application data → /var/corei/data
- Logs → /var/corei/logs
- Backups → /var/corei/backups

---

## LIMITATIONS (CURRENT)

- Single-node system
- Low resource mode
- No cluster orchestration yet
- No production security layer

---

## FUTURE TRANSITIONS

Will evolve into:

- Kubernetes cluster
- Multi-node infra
- Secure network layer
- Production-grade storage
- Observability stack

---
