#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

FAILURES=0

echo "=================================================="
echo "VALIDATING TELEMETRY CONTAMINATION"
echo "=================================================="

validate_empty_or_absent() {
  local path="$1"

  if [[ -d "${ROOT}/${path}" ]]; then
    CONTENTS=$(find "${ROOT}/${path}" -mindepth 1 | wc -l)

    if [[ "${CONTENTS}" -eq 0 ]]; then
      echo "[PASS] ${path} clean"
    else
      echo "[WARN] ${path} still contains legacy telemetry"
    fi
  else
    echo "[PASS] ${path} absent"
  fi
}

validate_empty_or_absent "logs"
validate_empty_or_absent "reports"

echo
echo "=================================================="
echo "TELEMETRY CONTAMINATION VALIDATION COMPLETE"
echo "=================================================="
