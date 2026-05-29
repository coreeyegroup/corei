#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21D-B VAULT INTEGRATION"
echo "====================================="

bash scripts/security/vault/initialize-vault.sh

bash scripts/security/vault/unseal-vault.sh

bash scripts/security/vault/validate-vault-integration.sh

echo
echo "[PASS] Stage-21D-B completed"
