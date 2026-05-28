#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — SMART ORDER ROUTER VALIDATION"
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
  infrastructure/components/smart-order-router/app/main.py
  infrastructure/components/smart-order-router/app/services/router_service.py
  infrastructure/components/smart-order-router/ROUTING-GOVERNANCE.md
  infrastructure/components/smart-order-router/Dockerfile
  infrastructure/components/smart-order-router/k8s/deployment.yaml
  infrastructure/components/smart-order-router/k8s/service.yaml
)

for file in "${FILES[@]}"; do
  check_file "${file}"
done

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-07 VALIDATION PASSED"
echo "=================================================="
