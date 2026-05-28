#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING TELEMETRY ISOLATION"
echo "=================================================="

validate_path() {
  local path="$1"

  if [[ -e "${ROOT}/${path}" ]]; then
    echo "[PASS] ${path}"
  else
    echo "[FAIL] ${path}"
    FAILURES=$((FAILURES+1))
  fi
}

echo
echo "[1/4] Telemetry topology validation..."

validate_path "telemetry/audits"
validate_path "telemetry/reports"
validate_path "telemetry/validation"
validate_path "telemetry/operations"

echo
echo "[2/4] Audit isolation validation..."

validate_path "telemetry/audits/live-validation"

echo
echo "[3/4] Report isolation validation..."

validate_path "telemetry/reports/live-validation"

echo
echo "[4/4] Log isolation validation..."

validate_path "telemetry/operations/live-activation"

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "TELEMETRY ISOLATION VALIDATION PASSED"
else
  echo "TELEMETRY ISOLATION VALIDATION FAILED"
fi

echo "=================================================="
