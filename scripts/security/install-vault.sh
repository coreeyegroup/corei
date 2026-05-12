#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing HashiCorp Vault"
echo "========================================="

helm repo add hashicorp https://helm.releases.hashicorp.com || true
helm repo update

kubectl create namespace vault \
  --dry-run=client -o yaml | kubectl apply -f -

helm upgrade --install vault hashicorp/vault \
  --namespace vault \
  --set "server.dev.enabled=false"

echo
echo "Waiting for Vault pod runtime..."

until kubectl get pod \
-l app.kubernetes.io/name=vault \
-n vault \
-o jsonpath='{.items[0].status.phase}' 2>/dev/null \
| grep -q Running; do

sleep 5

echo "Waiting for vault runtime..."

done

echo
echo "Vault runtime is active."

kubectl get pods -n vault

kubectl wait \
  --for=condition=Ready \
  pod \
  -l app.kubernetes.io/name=vault \
  -n vault \
  --timeout=600s

echo
echo "Vault installation completed."

kubectl get pods -n vault
