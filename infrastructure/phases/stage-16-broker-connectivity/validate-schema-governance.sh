#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — SCHEMA GOVERNANCE VALIDATION"
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
  infrastructure/phases/stage-16-broker-connectivity/SCHEMA-GOVERNANCE.md
  schemas/stage-16/compatibility/compatibility-policy.yaml
  schemas/stage-16/registry/schema-registry-governance.yaml
  schemas/stage-16/contracts/broker_health_v1.json
  schemas/stage-16/contracts/execution_session_v1.json
  schemas/stage-16/contracts/copy_trade_event_v1.json
  scripts/schema/stage-16/register-schemas.sh
  scripts/schema/stage-16/validate-compatibility.sh
  scripts/schema/stage-16/validate-lineage-governance.sh
)

for file in "${FILES[@]}"; do
  check_file "${file}"
done

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "STAGE-16 STEP-06 VALIDATION PASSED"
echo "=================================================="
