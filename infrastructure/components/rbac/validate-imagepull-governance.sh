#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: IMAGE PULL VALIDATION"
echo "=================================================="

echo ""
echo "[STEP-1] Validating image pull secret..."

kubectl get secret harbor-registry-pull \
  -n cicd

echo ""
echo "[STEP-2] Validating service account injection..."

kubectl get sa default \
  -n cicd \
  -o yaml | grep imagePullSecrets -A 3

echo ""
echo "[COMPLETE] Image pull governance validation successful."
