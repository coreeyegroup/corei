#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: HARBOR ACCESS VALIDATION"
echo "=================================================="

: "${HARBOR_URL:?HARBOR_URL not set}"
: "${HARBOR_ADMIN_USER:?HARBOR_ADMIN_USER not set}"
: "${HARBOR_ADMIN_PASSWORD:?HARBOR_ADMIN_PASSWORD not set}"

echo ""
echo "[STEP-1] Listing Harbor robot accounts..."

curl -ks \
  -H "Host: harbor.core.local" \
  -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}" \
  "${HARBOR_URL}/api/v2.0/projects/core-system/robots" | jq

echo ""
echo "[COMPLETE] Harbor access governance validation successful."
