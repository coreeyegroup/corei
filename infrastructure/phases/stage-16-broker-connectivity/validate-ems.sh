#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — EMS VALIDATION"
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
  infrastructure/components/ems/app/main.py
  infrastructure/components/ems/app/services/ems_service.py
  infrastructure/components/ems/app/connectors/mock_connector.py
  infrastructure/components/ems/EMS-GOVERNANCE.md
  infrastructure/components/ems/Dockerfile
  infrastructure/components/ems/k8s/deployment.yaml
  infrastructure/components/ems/k8s/service.yaml
)

for file in "${FILES[@]}"; do
  check_file "${file}"
done

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-09 VALIDATION PASSED"
echo "=================================================="
