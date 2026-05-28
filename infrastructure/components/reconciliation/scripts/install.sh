#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "INSTALLING RECONCILIATION SERVICE"
echo "=================================================="

kubectl apply -f infrastructure/components/reconciliation/k8s/deployment.yaml

kubectl apply -f infrastructure/components/reconciliation/k8s/service.yaml

echo
echo "Reconciliation deployment applied"
