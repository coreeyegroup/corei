#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — LINEAGE GOVERNANCE VALIDATION"
echo "=================================================="

PASS_COUNT=0

FIELDS=(
  signal_id
  trade_intent_id
  execution_intent_id
  order_id
)

for field in "${FIELDS[@]}"; do

  if grep -R "\"${field}\"" schemas/stage-16 >/dev/null 2>&1; then
    echo "[PASS] lineage field present: ${field}"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "[FAIL] lineage field missing: ${field}"
    exit 1
  fi

done

echo
echo "=================================================="
echo "TOTAL LINEAGE CHECKS PASSED: ${PASS_COUNT}"
echo "LINEAGE GOVERNANCE VALIDATION PASSED"
echo "=================================================="
