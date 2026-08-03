#!/usr/bin/env bash

set -euo pipefail

echo "[INFO] Validating Redis..."

kubectl exec -n database redis-0 -- \
redis-cli \
-a corei-redis-dev-password \
SET redis_validation ok

RESULT=$(kubectl exec -n database redis-0 -- \
redis-cli \
-a corei-redis-dev-password \
GET redis_validation)

if [[ "${RESULT}" != "ok" ]]; then
    echo "[FAIL] Redis validation failed"
    exit 1
fi

echo "[PASS] Redis operational"
