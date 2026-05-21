#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: ARGOCD VALIDATION"
echo "=================================================="

echo ""
echo "[STEP-1] Validating ArgoCD pods..."

kubectl get pods -n cicd | grep argocd

echo ""
echo "[STEP-2] Validating ArgoCD ingress..."

kubectl get ingress -n cicd | grep argocd

echo ""
echo "[STEP-3] Validating ArgoCD project..."

kubectl get appprojects -n cicd

echo ""
echo "[COMPLETE] ArgoCD validation successful."
