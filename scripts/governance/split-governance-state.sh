#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "SPLITTING GOVERNANCE STATE"
echo "=================================================="

copy_if_exists() {
  local source_path="$1"
  local target_path="$2"

  if [[ -e "${ROOT}/${source_path}" ]]; then
    mkdir -p "$(dirname "${ROOT}/${target_path}")"

    cp -r "${ROOT}/${source_path}" "${ROOT}/${target_path}" 2>/dev/null || true

    echo "[OK] ${source_path} -> ${target_path}"
  else
    echo "[SKIP] ${source_path} not present"
  fi
}

#
# Install governance
#

copy_if_exists \
  "state/install.state" \
  "state/governance/install/install.state"

#
# Live activation governance
#

copy_if_exists \
  "state/live-activation" \
  "state/governance/activation/live-activation"

#
# Live validation governance
#

copy_if_exists \
  "state/live-validation" \
  "state/governance/validation/live-validation"

#
# Resilience governance
#

copy_if_exists \
  "state/resilience" \
  "state/governance/recovery/resilience"

echo
echo "=================================================="
echo "GOVERNANCE STATE SPLIT COMPLETE"
echo "=================================================="
