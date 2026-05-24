#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: IMAGE PULL GOVERNANCE"
echo "=================================================="

: "${HARBOR_RUNTIME_PULL_USER:?HARBOR_RUNTIME_PULL_USER not set}"
: "${HARBOR_RUNTIME_PULL_SECRET:?HARBOR_RUNTIME_PULL_SECRET not set}"

echo ""
echo "[STEP-1] Removing existing image pull secret..."

kubectl delete secret harbor-registry-pull \
  -n cicd \
  --ignore-not-found

echo ""
echo "[STEP-2] Creating Harbor registry pull secret..."

kubectl create secret docker-registry harbor-registry-pull \
  --namespace cicd \
  --docker-server=harbor.core.local:32208 \
  --docker-username="${HARBOR_RUNTIME_PULL_USER}" \
  --docker-password="${HARBOR_RUNTIME_PULL_SECRET}"

echo ""
echo "[STEP-3] Patching default service account..."

kubectl patch serviceaccount default \
  -n cicd \
  -p '{
    "imagePullSecrets": [
      {
        "name": "harbor-registry-pull"
      }
    ]
  }'

echo ""
echo "[COMPLETE] Image pull governance configured successfully."
