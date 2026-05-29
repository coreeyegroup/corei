#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "VAULT FOUNDATION INSTALL"
echo "====================================="

kubectl create namespace vault \
  --dry-run=client -o yaml | kubectl apply -f -

helm repo add hashicorp https://helm.releases.hashicorp.com

helm repo update

helm upgrade \
  --install vault \
  hashicorp/vault \
  --namespace vault \
  -f infrastructure/components/vault/vault-values.yaml

echo
echo "[PASS] Vault installation submitted."
