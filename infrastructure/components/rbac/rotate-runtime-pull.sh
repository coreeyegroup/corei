#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: RUNTIME PULL ROTATION"
echo "=================================================="

: "${HARBOR_URL:?HARBOR_URL not set}"
: "${HARBOR_ADMIN_USER:?HARBOR_ADMIN_USER not set}"
: "${HARBOR_ADMIN_PASSWORD:?HARBOR_ADMIN_PASSWORD not set}"

ROBOT_ID=$(
curl -ks \
  -H "Host: harbor.core.local" \
  -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}" \
  "${HARBOR_URL}/api/v2.0/robots?q=name=harbor-runtime-pull" \
| jq -r '.[0].id'
)

echo ""
echo "[STEP-1] Removing existing runtime pull robot..."

curl -ks \
  -X DELETE \
  -H "Host: harbor.core.local" \
  -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}" \
  "${HARBOR_URL}/api/v2.0/robots/${ROBOT_ID}"

echo ""
echo "[STEP-2] Recreating runtime pull robot..."

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
echo "[COMPLETE] Runtime pull robot rotated successfully."
