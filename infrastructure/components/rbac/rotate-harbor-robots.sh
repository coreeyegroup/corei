#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: HARBOR ROBOT ROTATION"
echo "=================================================="

: "${HARBOR_URL:?HARBOR_URL not set}"
: "${HARBOR_ADMIN_USER:?HARBOR_ADMIN_USER not set}"
: "${HARBOR_ADMIN_PASSWORD:?HARBOR_ADMIN_PASSWORD not set}"

echo ""
echo "[STEP-1] Listing existing robot accounts..."

ROBOT_IDS=$(
curl -ks \
  -H "Host: harbor.core.local" \
  -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}" \
  "${HARBOR_URL}/api/v2.0/robots?q=level=project" \
| jq -r '.[].id'
)

echo ""
echo "[STEP-2] Removing existing robot accounts..."

for ROBOT_ID in ${ROBOT_IDS}; do

  echo "Removing robot ID: ${ROBOT_ID}"

  curl -ks \
    -X DELETE \
    -H "Host: harbor.core.local" \
    -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}" \
    "${HARBOR_URL}/api/v2.0/robots/${ROBOT_ID}"

done

echo ""
echo "[STEP-3] Recreating robot governance..."

bash infrastructure/components/rbac/configure-harbor-access.sh > /dev/null

echo ""
echo "[PASS] Harbor robot governance rotated successfully."
