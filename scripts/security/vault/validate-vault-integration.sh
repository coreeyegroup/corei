#!/usr/bin/env bash

set -euo pipefail

FAILURES=0

echo "====================================="
echo "VAULT INTEGRATION VALIDATION"
echo "====================================="

STATUS_JSON=$(kubectl exec -n vault vault-0 -- \
vault status -format=json)

INITIALIZED=$(echo "${STATUS_JSON}" | jq -r '.initialized')
SEALED=$(echo "${STATUS_JSON}" | jq -r '.sealed')

if [ "${INITIALIZED}" != "true" ]; then

    echo "[FAIL] Vault not initialized"

    FAILURES=$((FAILURES+1))

fi

if [ "${SEALED}" != "false" ]; then

    echo "[FAIL] Vault still sealed"

    FAILURES=$((FAILURES+1))

fi

READY=$(kubectl get pod vault-0 \
-n vault \
-o jsonpath='{.status.containerStatuses[0].ready}')

if [ "${READY}" != "true" ]; then

    echo "[FAIL] Vault pod not Ready"

    FAILURES=$((FAILURES+1))

fi

if [ "${FAILURES}" -ne 0 ]; then

    echo
    echo "[FAIL] Validation failed"

    exit 1

fi

echo
echo "[PASS] Vault operational"
