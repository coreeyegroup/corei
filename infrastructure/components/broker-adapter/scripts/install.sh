#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "INSTALLING BROKER ADAPTER SERVICE"
echo "=================================================="

kubectl apply -f infrastructure/components/broker-adapter/k8s/deployment.yaml

kubectl apply -f infrastructure/components/broker-adapter/k8s/service.yaml

echo
echo "Broker adapter deployment applied"
