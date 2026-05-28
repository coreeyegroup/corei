#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — BROKER ADAPTER VALIDATION"
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
  infrastructure/components/broker-adapter/app/main.py
  infrastructure/components/broker-adapter/app/services/broker_adapter_service.py
  infrastructure/components/broker-adapter/app/adapters/mock_adapter.py
  infrastructure/components/broker-adapter/BROKER-ADAPTER-GOVERNANCE.md
  infrastructure/components/broker-adapter/Dockerfile
  infrastructure/components/broker-adapter/k8s/deployment.yaml
  infrastructure/components/broker-adapter/k8s/service.yaml
)

for file in "${FILES[@]}"; do
  check_file "${file}"
done

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-10 VALIDATION PASSED"
echo "=================================================="
