#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "SPLITTING RUNTIME STATE"
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
# Runtime events
#

move_if_exists \
  "state/events" \
  "state/runtime/streams/events"

#
# Runtime reconciliation
#

move_if_exists \
  "runtime/reconciliation" \
  "state/runtime/reconciliation/runtime-reconciliation"

#
# Runtime replay
#

move_if_exists \
  "runtime/replay" \
  "state/runtime/replay/runtime-replay"

#
# Runtime execution
#

move_if_exists \
  "runtime/execution" \
  "state/runtime/execution/runtime-execution"

echo
echo "=================================================="
echo "RUNTIME STATE SPLIT COMPLETE"
echo "=================================================="
