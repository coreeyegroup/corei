#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "INSTALLING SMART ORDER ROUTER"
echo "=================================================="

kubectl apply -f infrastructure/components/smart-order-router/k8s/deployment.yaml
kubectl apply -f infrastructure/components/smart-order-router/k8s/service.yaml

echo
echo "Deployment applied"
