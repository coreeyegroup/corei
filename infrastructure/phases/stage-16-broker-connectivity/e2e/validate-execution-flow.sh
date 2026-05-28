#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — FULL EXECUTION FLOW VALIDATION"
echo "=================================================="

PASS_COUNT=0

validate() {

  local DESCRIPTION="$1"

  local COMMAND="$2"

  if eval "${COMMAND}" >/dev/null 2>&1; then

    echo "[PASS] ${DESCRIPTION}"

    PASS_COUNT=$((PASS_COUNT + 1))

  else

    echo "[FAIL] ${DESCRIPTION}"

    exit 1
  fi
}

validate \
  "smart-order-router ready" \
  "curl -s http://localhost:8000/health/ready | grep ready"

validate \
  "OMS ready" \
  "curl -s http://localhost:8001/health/ready | grep ready"

validate \
  "EMS ready" \
  "curl -s http://localhost:8002/health/ready | grep ready"

validate \
  "broker-adapter-service ready" \
  "curl -s http://localhost:8003/health/ready | grep ready"

validate \
  "fill-handler-service ready" \
  "curl -s http://localhost:8004/health/ready | grep ready"

validate \
  "reconciliation-service ready" \
  "curl -s http://localhost:8005/health/ready | grep ready"

validate \
  "copy-trade-engine ready" \
  "curl -s http://localhost:8006/health/ready | grep ready"

echo
echo "=================================================="
echo "TOTAL FLOW CHECKS PASSED: ${PASS_COUNT}"
echo "FULL EXECUTION FLOW VALIDATION PASSED"
echo "=================================================="
