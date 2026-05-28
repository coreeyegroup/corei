#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING OPERATIONAL CONTINUITY"
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

validate_path "telemetry"
validate_path "artifacts"
validate_path "runtime"
validate_path "governance"

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "OPERATIONAL CONTINUITY VALIDATION PASSED"
else
  echo "OPERATIONAL CONTINUITY VALIDATION FAILED"
fi

echo "=================================================="

exit ${FAILURES}
