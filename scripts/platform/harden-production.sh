#!/usr/bin/env bash

set -euo pipefail

LOG_DIR=".logs"

mkdir -p "${LOG_DIR}"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

LOG_FILE="${LOG_DIR}/harden-production-${TIMESTAMP}.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

echo "=================================================="
echo "CORE SYSTEM — STAGE-21 HARDENING"
echo "=================================================="

echo "[INFO] Starting governance reconciliation..."

bash infrastructure/phases/stage-21-production-hardening/reconcile.sh

echo "[INFO] Running validation..."

bash infrastructure/phases/stage-21-production-hardening/validate.sh

echo "[PASS] Stage-21 governance reconciliation completed."
