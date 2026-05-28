#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — GOVERNANCE VALIDATION"
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

check_exec() {
  local FILE="$1"

  if [ -x "${FILE}" ]; then
    echo "[PASS] executable ${FILE}"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "[FAIL] executable ${FILE}"
    exit 1
  fi
}

check_file infrastructure/phases/stage-16-broker-connectivity/GOVERNANCE-INDEX.md
check_file infrastructure/phases/stage-16-broker-connectivity/RECOVERY-GOVERNANCE.md

for script in \
audit.sh \
inventory.sh \
state.sh \
snapshot.sh \
rollback.sh \
backup.sh
do
  check_file infrastructure/phases/stage-16-broker-connectivity/${script}
  check_exec infrastructure/phases/stage-16-broker-connectivity/${script}
done

echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-04 VALIDATION PASSED"
echo "=================================================="
