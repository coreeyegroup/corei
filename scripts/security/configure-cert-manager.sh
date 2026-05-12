#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Configuring cert-manager"
echo "========================================="

echo
echo "Validating cert-manager runtime..."

kubectl get pods -n cert-manager

echo
echo "Checking ClusterIssuer governance assets..."

if [ -f "$HOME/corei/kubernetes/security/cert-manager/cluster-issuer.yaml" ]; then

echo
echo "ClusterIssuer asset detected."

else

echo
echo "ClusterIssuer asset not yet defined."

fi

echo
echo "Certificate issuance enforcement deferred until ingress onboarding."

echo
echo "cert-manager configuration validation completed."
