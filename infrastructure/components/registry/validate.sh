#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-A :: REGISTRY VALIDATION"
echo "=================================================="

: "${HARBOR_URL:?HARBOR_URL not set}"
: "${HARBOR_ADMIN_USER:?HARBOR_ADMIN_USER not set}"
: "${HARBOR_ADMIN_PASSWORD:?HARBOR_ADMIN_PASSWORD not set}"

TEST_IMAGE="hello-world"
TEST_TAG="stage10-validation"

REGISTRY_HOST="harbor.core.local:32208"

FULL_IMAGE="${REGISTRY_HOST}/core-system/${TEST_IMAGE}:${TEST_TAG}"

echo ""
echo "[STEP-1] Validating Harbor API connectivity..."

curl -ks \
  -H "Host: harbor.core.local" \
  -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}" \
  "${HARBOR_URL}/api/v2.0/projects" > /dev/null

echo ""
echo "[STEP-2] Pulling test image..."

docker pull hello-world:latest

echo ""
echo "[STEP-3] Tagging image for Harbor..."

docker tag hello-world:latest ${FULL_IMAGE}

echo ""
echo "[STEP-4] Authenticating to Harbor..."

echo "${HARBOR_ADMIN_PASSWORD}" | docker login ${REGISTRY_HOST} \
  --username "${HARBOR_ADMIN_USER}" \
  --password-stdin

echo ""
echo "[STEP-5] Pushing image to Harbor..."

docker push ${FULL_IMAGE}

echo ""
echo "[STEP-6] Validating repository existence..."

curl -ks \
  -H "Host: harbor.core.local" \
  -u "${HARBOR_ADMIN_USER}:${HARBOR_ADMIN_PASSWORD}" \
  "${HARBOR_URL}/api/v2.0/projects/core-system/repositories" | jq

echo ""
echo "[STEP-7] Removing local image..."

docker rmi ${FULL_IMAGE}

echo ""
echo "[STEP-8] Pulling image back from Harbor..."

docker pull ${FULL_IMAGE}

echo ""
echo "[STEP-9] Creating modified image for immutable validation..."

cat <<'IMMUTABLE_EOF' > Dockerfile.immutable-test
FROM hello-world:latest
LABEL immutable-test="true"
IMMUTABLE_EOF

docker build \
  -t immutable-test:latest \
  -f Dockerfile.immutable-test .

docker tag immutable-test:latest ${FULL_IMAGE}

echo ""
echo "[STEP-10] Validating immutable governance..."

set +e

docker push ${FULL_IMAGE}

IMMUTABLE_EXIT_CODE=$?

set -e

rm -f Dockerfile.immutable-test

if [[ ${IMMUTABLE_EXIT_CODE} -eq 0 ]]; then
  echo ""
  echo "[ERROR] Immutable governance FAILED."
  exit 1
else
  echo ""
  echo "[PASS] Immutable governance operational."
fi

echo ""
echo "[STEP-11] Registry validation completed successfully."
