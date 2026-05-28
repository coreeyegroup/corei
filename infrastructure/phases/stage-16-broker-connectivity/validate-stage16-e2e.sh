#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — FINAL E2E VALIDATION"
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
  infrastructure/phases/stage-16-broker-connectivity/END-TO-END-EXECUTION-GOVERNANCE.md
  infrastructure/phases/stage-16-broker-connectivity/e2e/validate-services.sh
  infrastructure/phases/stage-16-broker-connectivity/e2e/validate-lineage.sh
  infrastructure/phases/stage-16-broker-connectivity/e2e/validate-reconciliation-flow.sh
  infrastructure/phases/stage-16-broker-connectivity/e2e/validate-copy-trade-flow.sh
  infrastructure/phases/stage-16-broker-connectivity/e2e/validate-execution-flow.sh
  infrastructure/phases/stage-16-broker-connectivity/e2e/run-stage16-e2e.sh
)

for file in "${FILES[@]}"; do
  check_file "${file}"
done

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-14 VALIDATION PASSED"
echo "=================================================="
