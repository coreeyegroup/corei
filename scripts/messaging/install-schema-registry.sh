#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing Schema Registry"
echo "========================================="

echo
echo "Deploying Schema Registry service..."

kubectl apply -f \
"$HOME/corei/kubernetes/messaging/schema-registry/schema-registry-service.yaml"

echo
echo "Deploying Schema Registry runtime..."

kubectl apply -f \
"$HOME/corei/kubernetes/messaging/schema-registry/schema-registry.yaml"

echo
echo "Waiting for Schema Registry readiness..."

kubectl rollout status deployment/schema-registry \
-n kafka \
--timeout=600s

echo
echo "Registering governed schemas..."

"$HOME/corei/scripts/messaging/register-schemas.sh"

echo
echo "Enforcing compatibility governance..."

"$HOME/corei/infrastructure/components/schema-registry/scripts/compatibility-check.sh"

echo
echo "Schema Registry operational."

kubectl get pods -n kafka
