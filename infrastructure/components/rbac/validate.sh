#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: RBAC VALIDATION"
echo "=================================================="

echo ""
echo "[STEP-1] Validating service accounts..."

kubectl get sa -n cicd

echo ""
echo "[STEP-2] Validating roles..."

kubectl get roles -n cicd

echo ""
echo "[STEP-3] Validating role bindings..."

kubectl get rolebindings -n cicd

echo ""
echo "[STEP-4] Validating cluster roles..."

kubectl get clusterroles | grep cicd

echo ""
echo "[STEP-5] Validating cluster role bindings..."

kubectl get clusterrolebindings | grep cicd

echo ""
echo "[COMPLETE] RBAC validation successful."
