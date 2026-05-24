#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: HARBOR ACCESS GOVERNANCE"
echo "=================================================="

: "${HARBOR_URL:?HARBOR_URL not set}"
: "${HARBOR_ADMIN_USER:?HARBOR_ADMIN_USER not set}"
: "${HARBOR_ADMIN_PASSWORD:?HARBOR_ADMIN_PASSWORD not set}"

CURL_ARGS=(
  -ks
  -H "Host: harbor.core.local"
  -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}"
  -H "Content-Type: application/json"
)

echo ""
echo "[STEP-1] Creating CI push robot account..."

curl "${CURL_ARGS[@]}" \
  -X POST \
  "${HARBOR_URL}/api/v2.0/robots" \
  -d '{
    "name": "harbor-ci-push",
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
            "action": "push"
          },
          {
            "resource": "repository",
            "action": "pull"
          }
        ]
      }
    ]
  }' | jq

echo ""
echo "[STEP-2] Creating runtime pull robot account..."

curl "${CURL_ARGS[@]}" \
  -X POST \
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
echo "[STEP-3] Creating readonly robot account..."

curl "${CURL_ARGS[@]}" \
  -X POST \
  "${HARBOR_URL}/api/v2.0/robots" \
  -d '{
    "name": "harbor-readonly",
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
echo "[COMPLETE] Harbor access governance configured successfully."
