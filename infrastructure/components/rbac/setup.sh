#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: RBAC SETUP"
echo "=================================================="

echo ""
echo "[STEP-1] Applying service accounts..."

kubectl apply -f \
kubernetes/cicd/rbac/cicd-serviceaccounts.yaml

echo ""
echo "[STEP-2] Applying namespace roles..."

kubectl apply -f \
kubernetes/cicd/rbac/cicd-roles.yaml

echo ""
echo "[STEP-3] Applying role bindings..."

kubectl apply -f \
kubernetes/cicd/rbac/cicd-rolebindings.yaml

echo ""
echo "[STEP-4] Applying cluster roles..."

kubectl apply -f \
kubernetes/cicd/rbac/cicd-clusterroles.yaml

echo ""
echo "[STEP-5] Applying cluster role bindings..."

kubectl apply -f \
kubernetes/cicd/rbac/cicd-clusterrolebindings.yaml

echo ""
echo "[COMPLETE] RBAC governance applied successfully."
