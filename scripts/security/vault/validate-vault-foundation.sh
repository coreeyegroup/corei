#!/usr/bin/env bash

set -euo pipefail

FAILURES=0

echo "====================================="
echo "VAULT FOUNDATION VALIDATION"
echo "====================================="

kubectl get ns vault >/dev/null 2>&1 \
|| FAILURES=$((FAILURES+1))

kubectl get pods -n vault >/dev/null 2>&1 \
|| FAILURES=$((FAILURES+1))

if [ "${FAILURES}" -ne 0 ]; then

    echo "[FAIL] Vault foundation validation failed"
    exit 1

fi

echo "[PASS] Vault foundation validation passed"
