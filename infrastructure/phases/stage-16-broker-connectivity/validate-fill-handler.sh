#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — FILL HANDLER VALIDATION"
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
  infrastructure/components/fill-handler/app/main.py
  infrastructure/components/fill-handler/app/services/fill_handler_service.py
  infrastructure/components/fill-handler/app/hashing/lineage_hasher.py
  infrastructure/components/fill-handler/FILL-HANDLER-GOVERNANCE.md
  infrastructure/components/fill-handler/Dockerfile
  infrastructure/components/fill-handler/k8s/deployment.yaml
  infrastructure/components/fill-handler/k8s/service.yaml
)

for file in "${FILES[@]}"; do
  check_file "${file}"
done

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-11 VALIDATION PASSED"
echo "=================================================="
