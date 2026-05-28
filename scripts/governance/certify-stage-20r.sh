#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "CERTIFYING STAGE 20R"
echo "=================================================="

FAILURES=0

check_path() {
  local path="$1"

  if [[ -e "${ROOT}/${path}" ]]; then
    echo "[PASS] ${path}"
  else
    echo "[FAIL] ${path}"
    FAILURES=$((FAILURES+1))
  fi
}

check_path "docs/governance"
check_path "telemetry"
check_path "artifacts"
check_path "runtime"
check_path "state/governance"
check_path "state/runtime"

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "STAGE 20R CERTIFICATION PASSED"
else
  echo "STAGE 20R CERTIFICATION FAILED"
fi

echo "=================================================="

exit ${FAILURES}
