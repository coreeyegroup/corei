#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "ISOLATING OPERATIONAL TELEMETRY"
echo "=================================================="

move_if_exists() {
  local source_path="$1"
  local target_path="$2"

  if [[ -e "${ROOT}/${source_path}" ]]; then
    mkdir -p "$(dirname "${ROOT}/${target_path}")"

    mv "${ROOT}/${source_path}" "${ROOT}/${target_path}" 2>/dev/null || true

    echo "[OK] ${source_path} -> ${target_path}"
  else
    echo "[SKIP] ${source_path} not present"
  fi
}

#
# Audit telemetry
#

move_if_exists \
  "audit/live-validation" \
  "telemetry/audits/live-validation"

#
# Operational logs
#

move_if_exists \
  "logs/live-activation" \
  "telemetry/operations/live-activation"

#
# Validation reports
#

move_if_exists \
  "reports/live-validation" \
  "telemetry/reports/live-validation"

echo
echo "=================================================="
echo "OPERATIONAL TELEMETRY ISOLATION COMPLETE"
echo "=================================================="
