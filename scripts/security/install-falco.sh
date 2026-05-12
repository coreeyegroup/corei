#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing Falco"
echo "========================================="

FALCO_CHART_VERSION="4.20.0"

echo
echo "Adding Falco Helm repository..."

helm repo add falcosecurity https://falcosecurity.github.io/charts || true

helm repo update

echo
echo "Creating logging namespace..."

kubectl create namespace logging \
--dry-run=client -o yaml | kubectl apply -f -

echo
echo "Installing Falco runtime..."

helm upgrade --install falco falcosecurity/falco \
--namespace logging \
--version "$FALCO_CHART_VERSION" \
--set falcoctl.artifact.install.enabled=false \
--set falcoctl.artifact.follow.enabled=false

echo
echo "Waiting for Falco daemonset rollout..."

kubectl rollout status daemonset/falco \
-n logging \
--timeout=600s

echo
echo "Falco runtime operational."

kubectl get pods -n logging
