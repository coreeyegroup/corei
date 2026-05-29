#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21D-E DYNAMIC ROTATION"
echo "====================================="

bash scripts/security/vault/database/issue-dynamic-credential.sh

bash scripts/security/vault/database/validate-rotation.sh

echo
echo "[PASS] Stage-21D-E governance validation complete"
