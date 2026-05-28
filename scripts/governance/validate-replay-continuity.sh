#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING REPLAY CONTINUITY"
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

validate_path "state/runtime/replay"
validate_path "runtime/events"
validate_path "telemetry/replay"

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "REPLAY CONTINUITY VALIDATION PASSED"
else
  echo "REPLAY CONTINUITY VALIDATION FAILED"
fi

echo "=================================================="

exit ${FAILURES}
