#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — RECONCILIATION VALIDATION"
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
  infrastructure/components/reconciliation/app/main.py
  infrastructure/components/reconciliation/app/services/reconciliation_service.py
  infrastructure/components/reconciliation/app/services/reconciliation_engine.py
  infrastructure/components/reconciliation/RECONCILIATION-GOVERNANCE.md
  infrastructure/components/reconciliation/Dockerfile
  infrastructure/components/reconciliation/k8s/deployment.yaml
  infrastructure/components/reconciliation/k8s/service.yaml
)

for file in "${FILES[@]}"; do
  check_file "${file}"
done

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-12 VALIDATION PASSED"
echo "=================================================="
