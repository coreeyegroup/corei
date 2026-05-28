#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "INSTALLING FILL HANDLER SERVICE"
echo "=================================================="

kubectl apply -f infrastructure/components/fill-handler/k8s/deployment.yaml

kubectl apply -f infrastructure/components/fill-handler/k8s/service.yaml

echo
echo "Fill handler deployment applied"
