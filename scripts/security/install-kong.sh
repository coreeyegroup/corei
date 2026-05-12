#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing Kong"
echo "========================================="

KONG_CHART_VERSION="2.48.0"

echo
echo "Adding Kong Helm repository..."

helm repo add kong https://charts.konghq.com || true

helm repo update

echo
echo "Creating platform namespace..."

kubectl create namespace platform \
--dry-run=client -o yaml | kubectl apply -f -

echo
echo "Installing Kong CRDs..."

kubectl apply -f \
https://raw.githubusercontent.com/Kong/charts/main/charts/kong/crds/custom-resource-definitions.yaml

echo
echo "Installing Kong gateway runtime..."

helm upgrade --install kong kong/kong \
--namespace platform \
--version "$KONG_CHART_VERSION"

echo
echo "Waiting for Kong controller..."

kubectl wait \
--for=condition=Available \
deployment/kong-kong \
-n platform \
--timeout=600s

echo
echo "Kong runtime operational."

kubectl get pods -n platform
