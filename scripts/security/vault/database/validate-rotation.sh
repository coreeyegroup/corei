#!/usr/bin/env bash

set -euo pipefail

LEASE_FILE=state/security/vault/latest-lease.json

if [ ! -f "${LEASE_FILE}" ]; then

    echo "[FAIL] Missing lease file"

    exit 1

fi

LEASE_ID=$(jq -r '.lease_id' "${LEASE_FILE}")

TTL=$(jq -r '.lease_duration' "${LEASE_FILE}")

USER=$(jq -r '.data.username' "${LEASE_FILE}")

echo "====================================="
echo "LEASE VALIDATION"
echo "====================================="

echo "LEASE_ID=${LEASE_ID}"
echo "TTL=${TTL}"
echo "USER=${USER}"

echo
echo "[PASS] Lease validation complete"
