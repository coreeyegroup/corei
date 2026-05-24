#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-A :: HARBOR CONFIGURATION"
echo "=================================================="

: "${HARBOR_URL:?HARBOR_URL not set}"
: "${HARBOR_ADMIN_USER:?HARBOR_ADMIN_USER not set}"
: "${HARBOR_ADMIN_PASSWORD:?HARBOR_ADMIN_PASSWORD not set}"

PROJECT_NAME="core-system"
HARBOR_HOST_HEADER="harbor.core.local"

CURL_AUTH_ARGS=(
  -ks
  -H "Host: ${HARBOR_HOST_HEADER}"
  -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}"
)

echo ""
echo "[STEP-1] Validating Harbor API connectivity..."

curl "${CURL_AUTH_ARGS[@]}" \
  "${HARBOR_URL}/api/v2.0/projects" > /dev/null

echo ""
echo "[STEP-2] Checking Harbor project existence..."

PROJECT_EXISTS=$(
  curl "${CURL_AUTH_ARGS[@]}" \
  "${HARBOR_URL}/api/v2.0/projects" \
  | jq -r '.[].name' \
  | grep "^${PROJECT_NAME}$" || true
)

if [[ "${PROJECT_EXISTS}" != "${PROJECT_NAME}" ]]; then

  echo ""
  echo "[STEP-3] Creating Harbor project..."

  curl "${CURL_AUTH_ARGS[@]}" \
    -X POST \
    -H "Content-Type: application/json" \
    "${HARBOR_URL}/api/v2.0/projects" \
    -d "{
      \"project_name\": \"${PROJECT_NAME}\",
      \"public\": false,
      \"storage_limit\": -1
    }"

  echo ""
  echo "Project created."

else
  echo "Project already exists."
fi

echo ""
echo "[STEP-4] Removing old immutable governance rules..."

RULE_IDS=$(
  curl "${CURL_AUTH_ARGS[@]}" \
  "${HARBOR_URL}/api/v2.0/projects/${PROJECT_NAME}/immutabletagrules" \
  | jq -r '.[].id'
)

for RULE_ID in ${RULE_IDS}; do

  curl "${CURL_AUTH_ARGS[@]}" \
    -X DELETE \
    "${HARBOR_URL}/api/v2.0/projects/${PROJECT_NAME}/immutabletagrules/${RULE_ID}"

done

echo ""
echo "[STEP-5] Creating strict immutable governance..."

curl "${CURL_AUTH_ARGS[@]}" \
  -X POST \
  -H "Content-Type: application/json" \
  "${HARBOR_URL}/api/v2.0/projects/${PROJECT_NAME}/immutabletagrules" \
  -d '{
    "disabled": false,
    "action": "immutable",
    "scope_selectors": {
      "repository": [{
        "kind": "doublestar",
        "decoration": "repoMatches",
        "pattern": "**"
      }],
      "tag": [{
        "kind": "doublestar",
        "decoration": "matches",
        "pattern": "**"
      }]
    },
    "tag_selectors": [{
      "kind": "doublestar",
      "decoration": "matches",
      "pattern": "**"
    }]
  }'

echo ""
echo "[STEP-6] Validating immutable governance..."

curl "${CURL_AUTH_ARGS[@]}" \
"${HARBOR_URL}/api/v2.0/projects/${PROJECT_NAME}/immutabletagrules" | jq

echo ""
echo "[STEP-7] Harbor configuration governance completed successfully."
