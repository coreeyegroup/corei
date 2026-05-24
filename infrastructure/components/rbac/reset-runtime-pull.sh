#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: RUNTIME ROBOT RESET"
echo "=================================================="

: "${HARBOR_URL:?HARBOR_URL not set}"
: "${HARBOR_ADMIN_USER:?HARBOR_ADMIN_USER not set}"
: "${HARBOR_ADMIN_PASSWORD:?HARBOR_ADMIN_PASSWORD not set}"

echo ""
echo "[STEP-1] Listing ALL Harbor robots..."

curl -ks \
  -H "Host: harbor.core.local" \
  -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}" \
  "${HARBOR_URL}/api/v2.0/robots" | jq

echo ""
echo "[STEP-2] Manually identify runtime pull robot ID from output."

echo ""
echo "[ACTION REQUIRED]"
echo "Delete robot manually using:"
echo ""
echo "curl -ks -X DELETE \\"
echo "  -H \"Host: harbor.core.local\" \\"
echo "  -u \"\${HARBOR_ADMIN_USER}:\${HARBOR_ADMIN_PASSWORD}\" \\"
echo "  \"\${HARBOR_URL}/api/v2.0/robots/<ROBOT_ID>\""

echo ""
echo "[STEP-3] Recreate runtime pull robot manually..."

curl -ks \
  -X POST \
  -H "Host: harbor.core.local" \
  -H "Content-Type: application/json" \
  -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}" \
  "${HARBOR_URL}/api/v2.0/robots" \
  -d '{
    "name": "harbor-runtime-pull",
    "level": "project",
    "duration": 30,
    "disable": false,
    "permissions": [
      {
        "kind": "project",
        "namespace": "core-system",
        "access": [
          {
            "resource": "repository",
            "action": "pull"
          }
        ]
      }
    ]
  }' | jq

echo ""
echo "[COMPLETE] Runtime pull robot recreated."
