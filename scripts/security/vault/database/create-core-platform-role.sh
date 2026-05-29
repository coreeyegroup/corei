#!/usr/bin/env bash

set -euo pipefail

ROOT_TOKEN=$(jq -r '.root_token' \
state/security/vault/init.json)

echo "====================================="
echo "CREATE DATABASE ROLE"
echo "====================================="

kubectl exec -n vault vault-0 -- sh -c "
export VAULT_TOKEN=${ROOT_TOKEN}

vault write database/roles/core-platform \
db_name=core-timescaledb \
creation_statements=\"CREATE ROLE \\\"{{name}}\\\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; GRANT CONNECT ON DATABASE marketdata TO \\\"{{name}}\\\";\" \
default_ttl=1h \
max_ttl=24h
"

echo
echo "[PASS] Database role created"
