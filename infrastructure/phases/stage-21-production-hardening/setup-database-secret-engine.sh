#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21D-C DATABASE SECRET ENGINE"
echo "====================================="

bash scripts/security/vault/database/enable-database-engine.sh

bash scripts/security/vault/database/configure-timescaledb-connection.sh

bash scripts/security/vault/database/create-core-platform-role.sh

bash scripts/security/vault/database/validate-database-engine.sh

echo
echo "[PASS] Stage-21D-C completed"
