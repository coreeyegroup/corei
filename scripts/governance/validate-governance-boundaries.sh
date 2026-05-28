#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "VALIDATING GOVERNANCE BOUNDARIES"
echo "=================================================="

FAILURES=0

check_path() {
  local path="$1"

  if [[ -e "${ROOT}/${path}" ]]; then
    echo "[OK] ${path}"
  else
    echo "[WARN] Missing ${path}"
  fi
}

echo
echo "[1/4] Validating source authority domains..."

check_path "services"
check_path "scripts"
check_path "governance"

echo
echo "[2/4] Validating runtime domains..."

check_path "runtime"
check_path "logs"

echo
echo "[3/4] Validating artifact domains..."

check_path "artifacts"

echo
echo "[4/4] Validating governance state..."

check_path "state"

echo
echo "=================================================="
echo "BOUNDARY VALIDATION COMPLETE"
echo "=================================================="
