#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: ARGOCD CONFIGURATION"
echo "=================================================="

echo ""
echo "[STEP-1] Applying ArgoCD RBAC governance..."

kubectl apply -f \
kubernetes/cicd/argocd/argocd-rbac-cm.yaml

echo ""
echo "[STEP-2] Applying ArgoCD project governance..."

kubectl apply -f \
argocd/projects/core-system-project.yaml

echo ""
echo "[COMPLETE] ArgoCD configuration governance completed."
