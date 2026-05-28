#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "MIGRATING RECOVERY ASSETS"
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
# Stage-10 backups
#

move_if_exists \
  "state/stage-10a/backups" \
  "artifacts/backups/stage-10a-backups"

#
# Stage-11 backups
#

move_if_exists \
  "state/stage-11/backups" \
  "artifacts/backups/stage-11-backups"

#
# Recovery validation exports
#

move_if_exists \
  "infrastructure/phases/stage-19-recovery-validation/state" \
  "artifacts/recovery/stage-19-recovery-state"

echo
echo "=================================================="
echo "RECOVERY ASSET MIGRATION COMPLETE"
echo "=================================================="
