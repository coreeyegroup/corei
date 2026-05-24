#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-10 :: PHASE-A :: HARBOR INSTALLATION"
echo "=================================================="

HARBOR_NAMESPACE="cicd"
HARBOR_RELEASE="harbor"
HARBOR_REPO_NAME="harbor"
HARBOR_REPO_URL="https://helm.goharbor.io"

VALUES_FILE="infrastructure/phases/stage-10-cicd/values/harbor-values.yaml"

echo ""
echo "[STEP-1] Creating namespace..."
kubectl create namespace ${HARBOR_NAMESPACE} \
  --dry-run=client -o yaml | kubectl apply -f -

echo ""
echo "[STEP-2] Adding Harbor Helm repository..."

if ! helm repo list | grep -q "^${HARBOR_REPO_NAME}"; then
  helm repo add ${HARBOR_REPO_NAME} ${HARBOR_REPO_URL}
else
  echo "Harbor repository already configured."
fi

echo ""
echo "[STEP-3] Updating Helm repositories..."
helm repo update

echo ""
echo "[STEP-4] Installing Harbor..."

helm upgrade --install ${HARBOR_RELEASE} ${HARBOR_REPO_NAME}/harbor \
  --namespace ${HARBOR_NAMESPACE} \
  --values ${VALUES_FILE} \
  --wait \
  --timeout 30m

echo ""
echo "[STEP-5] Validating Harbor pods..."

kubectl get pods -n ${HARBOR_NAMESPACE}

echo ""
echo "[STEP-6] Waiting for Harbor Core..."

kubectl wait \
  --namespace ${HARBOR_NAMESPACE} \
  --for=condition=Ready pod \
  -l component=core \
  --timeout=1800s

echo ""
echo "[STEP-7] Waiting for Harbor Registry..."

kubectl wait \
  --namespace ${HARBOR_NAMESPACE} \
  --for=condition=Ready pod \
  -l component=registry \
  --timeout=1800s

echo ""
echo "[STEP-8] Waiting for Harbor Portal..."

kubectl wait \
  --namespace ${HARBOR_NAMESPACE} \
  --for=condition=Ready pod \
  -l component=portal \
  --timeout=1800s

echo ""
echo "[STEP-9] Harbor installation lifecycle completed successfully."
