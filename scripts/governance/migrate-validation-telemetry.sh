#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "MIGRATING VALIDATION TELEMETRY"
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
# Stage-10 validation outputs
#

move_if_exists \
  "state/stage-10a/validation" \
  "telemetry/validation/stage-10a-validation"

#
# Stage-12 validation outputs
#

move_if_exists \
  "state/stage-12/validation" \
  "telemetry/validation/stage-12-validation"

#
# Stage-14 validation outputs
#

move_if_exists \
  "artifacts/stage-14/validation" \
  "telemetry/validation/stage-14-validation"

echo
echo "=================================================="
echo "VALIDATION TELEMETRY MIGRATION COMPLETE"
echo "=================================================="
