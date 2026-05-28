#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "INSTALLING EMS"
echo "=================================================="

kubectl apply -f infrastructure/components/ems/k8s/deployment.yaml

kubectl apply -f infrastructure/components/ems/k8s/service.yaml

echo
echo "EMS deployment applied"
