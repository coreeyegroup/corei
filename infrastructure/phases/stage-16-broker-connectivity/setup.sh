#!/usr/bin/env bash
set -euo pipefail

LOG_DIR=".logs/stage-16"
mkdir -p "${LOG_DIR}"

LOG_FILE="${LOG_DIR}/setup-$(date +%Y%m%d-%H%M%S).log"

exec > >(tee -a "${LOG_FILE}") 2>&1

echo "=================================================="
echo "STAGE-16 — BROKER CONNECTIVITY FOUNDATION"
echo "SETUP START"
echo "=================================================="

REQUIRED_DIRS=(
  infrastructure/components/smart-order-router
  infrastructure/components/oms
  infrastructure/components/ems
  infrastructure/components/broker-adapter
  infrastructure/components/fill-handler
  infrastructure/components/reconciliation
  infrastructure/components/copy-trade-engine
  kubernetes/execution
  kubernetes/trading-infra
)

for dir in "${REQUIRED_DIRS[@]}"; do
  if [ ! -d "${dir}" ]; then
    echo "[FAIL] Missing directory: ${dir}"
    exit 1
  fi
done

echo "[PASS] Stage-16 topology verified"

echo "Stage-16 setup foundation complete"
