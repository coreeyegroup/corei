#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing cert-manager"
echo "========================================="

CERT_MANAGER_VERSION="v1.18.2"

echo
echo "Adding Jetstack Helm repository..."

helm repo add jetstack https://charts.jetstack.io || true

helm repo update

echo
echo "Creating cert-manager namespace..."

kubectl create namespace cert-manager \
--dry-run=client -o yaml | kubectl apply -f -

echo
echo "Installing cert-manager runtime..."

helm upgrade --install cert-manager jetstack/cert-manager \
--namespace cert-manager \
--version "$CERT_MANAGER_VERSION" \
--set installCRDs=true

echo
echo "Waiting for cert-manager controller..."

kubectl wait \
--for=condition=Available \
deployment/cert-manager \
-n cert-manager \
--timeout=600s

echo
echo "Waiting for cert-manager webhook..."

kubectl wait \
--for=condition=Available \
deployment/cert-manager-webhook \
-n cert-manager \
--timeout=600s

echo
echo "Waiting for cert-manager cainjector..."

kubectl wait \
--for=condition=Available \
deployment/cert-manager-cainjector \
-n cert-manager \
--timeout=600s

echo
echo "cert-manager runtime operational."

kubectl get pods -n cert-manager
