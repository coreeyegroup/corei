#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — OMS VALIDATION"
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
  infrastructure/components/oms/app/main.py
  infrastructure/components/oms/app/services/oms_service.py
  infrastructure/components/oms/app/models/order_state.py
  infrastructure/components/oms/OMS-GOVERNANCE.md
  infrastructure/components/oms/Dockerfile
  infrastructure/components/oms/k8s/deployment.yaml
  infrastructure/components/oms/k8s/service.yaml
)

for file in "${FILES[@]}"; do
  check_file "${file}"
done

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-08 VALIDATION PASSED"
echo "=================================================="
