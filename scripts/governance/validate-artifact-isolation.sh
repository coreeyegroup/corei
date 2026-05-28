#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING ARTIFACT ISOLATION"
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
echo "[1/3] Artifact topology validation..."

validate_path "artifacts/runtime-images"
validate_path "artifacts/snapshots"
validate_path "artifacts/recovery"
validate_path "artifacts/exports"

echo
echo "[2/3] Backup topology validation..."

validate_path "artifacts/backups"

echo
echo "[3/3] Runtime isolation validation..."

if [[ ! -d "${ROOT}/runtime/images" ]]; then
  echo "[PASS] runtime/images isolated"
else
  echo "[FAIL] runtime/images still present"
  FAILURES=$((FAILURES+1))
fi

echo
echo "=================================================="

if [[ ${FAILURES} -eq 0 ]]; then
  echo "ARTIFACT ISOLATION VALIDATION PASSED"
else
  echo "ARTIFACT ISOLATION VALIDATION FAILED"
fi

echo "=================================================="
