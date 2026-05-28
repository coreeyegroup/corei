#!/usr/bin/env bash

set -euo pipefail

ROOT="${HOME}/corei"

echo "=================================================="
echo "APPLYING GOVERNANCE POLICY"
echo "=================================================="

"${ROOT}/scripts/governance/generate-authoritative-gitignore.sh"

echo
echo "[OK] Governance policy applied"

echo
echo "=================================================="
echo "GOVERNANCE POLICY APPLICATION COMPLETE"
echo "=================================================="
