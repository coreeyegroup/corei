#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "MIGRATING STATE DOMAINS"
echo "=================================================="

#
# Governance state
#

mkdir -p "${ROOT}/state/governance"

#
# Runtime state
#

mkdir -p "${ROOT}/state/runtime"

#
# Move governance-authoritative install state
#

if [[ -f "${ROOT}/state/install.state" ]]; then
  cp "${ROOT}/state/install.state" \
     "${ROOT}/state/governance/install.state"

  echo "[OK] install.state copied to governance domain"
fi

echo
echo "=================================================="
echo "STATE DOMAIN MIGRATION COMPLETE"
echo "=================================================="
