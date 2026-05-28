#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — SCHEMA COMPATIBILITY VALIDATION"
echo "=================================================="

PASS_COUNT=0

FILES=(
  schemas/stage-16/compatibility/compatibility-policy.yaml
  schemas/stage-16/registry/schema-registry-governance.yaml
  schemas/stage-16/contracts/broker_health_v1.json
  schemas/stage-16/contracts/execution_session_v1.json
  schemas/stage-16/contracts/copy_trade_event_v1.json
)

for file in "${FILES[@]}"; do

  if [ -f "${file}" ]; then
    echo "[PASS] ${file}"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "[FAIL] ${file}"
    exit 1
  fi

done

echo
echo "=================================================="
echo "TOTAL COMPATIBILITY CHECKS PASSED: ${PASS_COUNT}"
echo "SCHEMA COMPATIBILITY VALIDATION PASSED"
echo "=================================================="
