#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — SCOPE VALIDATION"
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

check_content() {
  local FILE="$1"
  local PATTERN="$2"

  if grep -q "${PATTERN}" "${FILE}"; then
    echo "[PASS] ${FILE} contains: ${PATTERN}"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "[FAIL] ${FILE} missing: ${PATTERN}"
    exit 1
  fi
}

check_file infrastructure/phases/stage-16-broker-connectivity/SCOPE.md
check_file infrastructure/phases/stage-16-broker-connectivity/SERVICE-BOUNDARIES.md
check_file infrastructure/phases/stage-16-broker-connectivity/MOCK-GOVERNANCE.md

check_content infrastructure/phases/stage-16-broker-connectivity/SCOPE.md "MOCK_MODE=true"
check_content infrastructure/phases/stage-16-broker-connectivity/SCOPE.md "Kafka remains:"
check_content infrastructure/phases/stage-16-broker-connectivity/SCOPE.md "fill_id"

check_content infrastructure/phases/stage-16-broker-connectivity/SERVICE-BOUNDARIES.md "FORBIDDEN:"
check_content infrastructure/phases/stage-16-broker-connectivity/MOCK-GOVERNANCE.md "Stage-20"

echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-02 VALIDATION PASSED"
echo "=================================================="
