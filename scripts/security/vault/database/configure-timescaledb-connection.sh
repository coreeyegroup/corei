#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

echo "====================================="
echo "CONFIGURE TIMESCALEDB CONNECTION"
echo "====================================="

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}

vault write database/config/core-timescaledb \
plugin_name=postgresql-database-plugin \
allowed_roles=core-platform \
connection_url='postgresql://{{username}}:{{password}}@timescaledb.database.svc.cluster.local:5432/marketdata?sslmode=disable' \
username='coreeye' \
password='coreeye'
"

echo
echo "[PASS] TimescaleDB connection configured"
