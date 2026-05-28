#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "MIGRATING ARTIFACT DOMAINS"
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
# Runtime image artifacts
#

move_if_exists \
  "runtime/images" \
  "artifacts/runtime-images/runtime-images"

#
# Stage snapshots
#

move_if_exists \
  "snapshots" \
  "artifacts/snapshots/platform-snapshots"

#
# Runtime exports
#

move_if_exists \
  "exports" \
  "artifacts/exports/platform-exports"

#
# Replay exports
#

move_if_exists \
  "runtime/replay/exports" \
  "artifacts/replay/replay-exports"

echo
echo "=================================================="
echo "ARTIFACT DOMAIN MIGRATION COMPLETE"
echo "=================================================="
