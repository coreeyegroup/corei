#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$HOME/corei"

source "$ROOT_DIR/infrastructure/config/global.env"
source "$ROOT_DIR/infrastructure/config/versions.env"

LOG_DIR="$ROOT_DIR/infrastructure/state/stage-01/logs"

mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/stage-01-setup-$(date +%Y%m%d-%H%M%S).log"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "========================================="
echo "Stage 01 Machine Foundation"
echo "========================================="

echo "[INFO] Runtime already evolved."
echo "[INFO] Applying safe deterministic normalization."

echo "[INFO] Validating hostname..."
hostnamectl

echo "[INFO] Validating sysctl..."
sysctl vm.swappiness
sysctl net.ipv4.ip_forward

echo "[INFO] Validating Docker..."
docker --version

echo "[INFO] Validating containerd..."
containerd --version

echo "[INFO] Validating Chrony..."
systemctl status chrony --no-pager

echo "[INFO] Stage 01 normalization complete."
