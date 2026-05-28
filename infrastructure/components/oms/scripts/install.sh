#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "INSTALLING OMS"
echo "=================================================="

kubectl apply -f infrastructure/components/oms/k8s/deployment.yaml

kubectl apply -f infrastructure/components/oms/k8s/service.yaml

echo
echo "OMS deployment applied"
