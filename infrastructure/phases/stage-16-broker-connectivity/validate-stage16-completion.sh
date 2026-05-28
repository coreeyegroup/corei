#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — FINAL COMPLETION VALIDATION"
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
  authoritative-stage-index.md.md
  institutional-stage-execution-lifecycle.md.md
  platform-continuity-restoration-block.md.md
  infrastructure/phases/stage-16-broker-connectivity/STAGE-16-COMPLETION-GOVERNANCE.md
  infrastructure/phases/stage-16-broker-connectivity/STAGE-17-TRANSITION-GOVERNANCE.md
)

for file in "${FILES[@]}"; do
  check_file "${file}"
done

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 FINAL COMPLETION VALIDATION PASSED"
echo "=================================================="
