#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — DISTRIBUTED SERVICE VALIDATION"
echo "=================================================="

PASS_COUNT=0

validate_service() {

  local NAMESPACE="$1"

  local DEPLOYMENT="$2"

  if kubectl get deployment "${DEPLOYMENT}" \
      -n "${NAMESPACE}" >/dev/null 2>&1; then

    echo "[PASS] ${DEPLOYMENT}"

    PASS_COUNT=$((PASS_COUNT + 1))

  else

    echo "[FAIL] ${DEPLOYMENT}"

    exit 1
  fi
}

validate_service execution smart-order-router

validate_service trading-infra oms

validate_service trading-infra ems

validate_service trading-infra broker-adapter-service

validate_service trading-infra fill-handler-service

validate_service trading-infra reconciliation-service

validate_service trading-infra copy-trade-engine

echo
echo "=================================================="
echo "TOTAL SERVICES VALIDATED: ${PASS_COUNT}"
echo "DISTRIBUTED SERVICE VALIDATION PASSED"
echo "=================================================="
