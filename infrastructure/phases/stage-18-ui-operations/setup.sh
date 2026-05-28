#!/usr/bin/env bash

set -euo pipefail

echo "[Stage-18.6] Workflow Automation & Alert Orchestration"

BASE_DIR="${HOME}/corei"

echo "[INFO] Deploying n8n workflow runtime"

kubectl delete deployment n8n \
  -n n8n \
  --ignore-not-found=true

sleep 5

kubectl apply -f \
  ${BASE_DIR}/kubernetes/n8n/deployment.yaml

kubectl apply -f \
  ${BASE_DIR}/kubernetes/n8n/service.yaml

kubectl apply -f \
  ${BASE_DIR}/kubernetes/n8n/ingress.yaml

echo "[INFO] Waiting for n8n convergence"

kubectl wait \
  --for=condition=available \
  deployment/n8n \
  -n n8n \
  --timeout=300s

echo "[PASS] Stage-18.6 workflow automation operational"
