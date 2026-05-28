#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "INSTALLING COPY TRADE ENGINE"
echo "=================================================="

kubectl apply -f infrastructure/components/copy-trade-engine/k8s/deployment.yaml

kubectl apply -f infrastructure/components/copy-trade-engine/k8s/service.yaml

echo
echo "Copy trade engine deployment applied"
