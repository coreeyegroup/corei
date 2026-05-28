#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — COPY TRADE VALIDATION"
echo "=================================================="

PASS_COUNT=0

check_file() {

  local FILE="$1"

  if [ -f "${FILE}" ]; then
    echo "[PASS] ${FILE}"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "[FAIL] ${FILE}"
    exit 1
  fi
}

FILES=(
  infrastructure/components/copy-trade-engine/app/main.py
  infrastructure/components/copy-trade-engine/app/services/copy_trade_service.py
  infrastructure/components/copy-trade-engine/app/scaling/scaling_engine.py
  infrastructure/components/copy-trade-engine/COPY-TRADE-GOVERNANCE.md
  infrastructure/components/copy-trade-engine/Dockerfile
  infrastructure/components/copy-trade-engine/k8s/deployment.yaml
  infrastructure/components/copy-trade-engine/k8s/service.yaml
)

for file in "${FILES[@]}"; do
  check_file "${file}"
done

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-13 VALIDATION PASSED"
echo "=================================================="
