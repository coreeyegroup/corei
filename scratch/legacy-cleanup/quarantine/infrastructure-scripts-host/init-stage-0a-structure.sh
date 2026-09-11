#!/usr/bin/env bash

set -euo pipefail

# ============================================================
# STAGE 0A — WINDOWS HOST PREPARATION
# Authoritative Structure Initialization
# ============================================================

ROOT="$HOME/corei"

INFRA="$ROOT/infrastructure"

echo "=================================================="
echo "Initializing Stage 0A authoritative structure"
echo "=================================================="

# ============================================================
# SCRIPT DIRECTORIES
# ============================================================

mkdir -p "$INFRA/scripts/host"

# ============================================================
# HOST DIRECTORIES
# ============================================================

mkdir -p "$INFRA/host/cloud-init"

mkdir -p "$INFRA/host/vmware"

mkdir -p "$INFRA/host/iso"

# ============================================================
# DOCUMENTATION DIRECTORIES
# ============================================================

mkdir -p "$ROOT/docs/host"

# ============================================================
# POWERSHELL SCRIPTS
# ============================================================

touch "$INFRA/scripts/host/windows-prereq-check.ps1"

touch "$INFRA/scripts/host/install-host-tools.ps1"

touch "$INFRA/scripts/host/create-vm.ps1"

touch "$INFRA/scripts/host/validate.ps1"

# ============================================================
# CLOUD INIT FILES
# ============================================================

touch "$INFRA/host/cloud-init/user-data.yaml"

touch "$INFRA/host/cloud-init/meta-data.yaml"

# ============================================================
# VMWARE FILES
# ============================================================

touch "$INFRA/host/vmware/core-node.vmx"

# ============================================================
# ISO VALIDATION FILE
# ============================================================

touch "$INFRA/host/iso/ubuntu-22.04.sha256"

# ============================================================
# DOCUMENTATION FILES
# ============================================================

touch "$ROOT/docs/host/stage-0a-windows-host-preparation.md"

touch "$ROOT/docs/host/vmware-networking.md"

touch "$ROOT/docs/host/vm-specification.md"

touch "$ROOT/docs/host/windows-tooling.md"

touch "$ROOT/docs/host/cloud-init-governance.md"

touch "$ROOT/docs/host/ssh-access-governance.md"

# ============================================================
# FINAL OUTPUT
# ============================================================

echo "=================================================="
echo "Stage 0A structure initialization complete"
echo "=================================================="

tree "$INFRA"
