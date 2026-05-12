#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Configuring Istio"
echo "========================================="

echo
echo "Validating Istio control plane..."

kubectl get pods -n istio-system

echo
echo "Current PeerAuthentication policies..."

kubectl get peerauthentication -A || true

echo
echo "STRICT mTLS policies prepared at:"

echo "$HOME/corei/kubernetes/security/mtls/strict-mtls.yaml"

echo
echo "mTLS enforcement deferred until workload namespaces are onboarded."

echo
echo "Istio configuration validation completed."
