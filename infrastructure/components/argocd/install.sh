#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-B :: ARGOCD INSTALLATION"
echo "=================================================="

ARGOCD_NAMESPACE="cicd"

VALUES_FILE="kubernetes/cicd/argocd/argocd-values.yaml"

echo ""
echo "[STEP-1] Adding ArgoCD Helm repository..."

if ! helm repo list | grep -q "^argo"; then
  helm repo add argo https://argoproj.github.io/argo-helm
else
  echo "Argo repository already configured."
fi

echo ""
echo "[STEP-2] Updating Helm repositories..."

helm repo update

echo ""
echo "[STEP-3] Installing ArgoCD..."

helm upgrade --install argocd argo/argo-cd \
  --namespace ${ARGOCD_NAMESPACE} \
  --values ${VALUES_FILE} \
  --wait \
  --timeout 30m

echo ""
echo "[STEP-4] Validating ArgoCD pods..."

kubectl get pods -n ${ARGOCD_NAMESPACE}

echo ""
echo "[COMPLETE] ArgoCD installation completed successfully."
