#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21D-A VAULT FOUNDATION"
echo "====================================="

bash scripts/security/vault/install-vault.sh

bash scripts/security/vault/validate-vault-foundation.sh

echo
echo "[PASS] Stage-21D-A completed."
