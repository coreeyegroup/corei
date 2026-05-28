#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "MIGRATING RUNTIME DOMAINS"
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
# Runtime event migration
#

move_if_exists \
  "runtime/stage-14/events" \
  "runtime/events/stage-14"

#
# Replay migration
#

move_if_exists \
  "state/replay" \
  "runtime/replay/state-replay"

#
# Execution runtime migration
#

move_if_exists \
  "state/execution_gate" \
  "runtime/execution/execution-gate"

#
# Portfolio runtime migration
#

move_if_exists \
  "state/portfolio" \
  "runtime/portfolio/state-portfolio"

#
# Operations runtime migration
#

move_if_exists \
  "state/operations" \
  "runtime/state/operations"

echo
echo "=================================================="
echo "RUNTIME DOMAIN MIGRATION COMPLETE"
echo "=================================================="
