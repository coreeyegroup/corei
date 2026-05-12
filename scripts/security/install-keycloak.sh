#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing Keycloak"
echo "========================================="

helm repo add bitnami https://charts.bitnami.com/bitnami || true
helm repo update

kubectl create namespace auth \
--dry-run=client -o yaml | kubectl apply -f -

kubectl apply -f \
"$HOME/corei/kubernetes/security/keycloak/secrets/keycloak-secrets.yaml"

helm upgrade --install keycloak bitnami/keycloak \
--namespace auth \
--version 24.3.0 \
--set auth.existingSecret=keycloak-admin-secret \
--set auth.passwordSecretKey=admin-password \
--set auth.username=admin

echo
echo "Waiting for Keycloak runtime..."

until kubectl get pod \
-l app.kubernetes.io/name=keycloak \
-n auth \
-o jsonpath='{.items[0].status.phase}' 2>/dev/null \
| grep -q Running; do

sleep 5

echo "Waiting for Keycloak runtime..."

done

echo
echo "Keycloak runtime is active."

kubectl get pods -n auth
