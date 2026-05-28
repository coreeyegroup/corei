#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "VALIDATING EMS"
echo "=================================================="

PASS_COUNT=0

check() {

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

check \
  "deployment exists" \
  "kubectl get deployment ems -n trading-infra"

check \
  "service exists" \
  "kubectl get service ems -n trading-infra"

check \
  "pod running" \
  "kubectl get pods -n trading-infra | grep ems | grep Running"

echo
echo "=================================================="
echo "TOTAL CHECKS PASSED: ${PASS_COUNT}"
echo "EMS VALIDATION PASSED"
echo "=================================================="
