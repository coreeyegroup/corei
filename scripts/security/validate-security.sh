#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Stage 06 Security Validation"
echo "========================================="

echo
echo "Validating Vault runtime..."

VAULT_POD=$(kubectl get pods -n vault \
-l app.kubernetes.io/name=vault \
-o jsonpath="{.items[0].metadata.name}")

kubectl exec -n vault "$VAULT_POD" -- \
vault status

echo
echo "Validating Keycloak runtime..."

kubectl get pods -n auth

echo
echo "Checking Keycloak realm authority..."

ADMIN_PASSWORD=$(kubectl get secret \
keycloak-admin-secret \
-n auth \
-o jsonpath="{.data.admin-password}" \
| base64 -d)

kubectl port-forward -n auth \
svc/keycloak 8080:8080 \
> /tmp/keycloak-validation.log 2>&1 &

PF_PID=$!

sleep 10

cleanup() {
kill "$PF_PID" >/dev/null 2>&1 || true
}

trap cleanup EXIT

ACCESS_TOKEN=$(curl -s \
-X POST \
http://localhost:8080/realms/master/protocol/openid-connect/token \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "username=admin" \
-d "password=$ADMIN_PASSWORD" \
-d "grant_type=password" \
-d "client_id=admin-cli" \
| jq -r '.access_token')

REALM_NAME=$(curl -s \
-H "Authorization: Bearer $ACCESS_TOKEN" \
http://localhost:8080/admin/realms/trading-platform \
| jq -r '.realm')

if [ "$REALM_NAME" != "trading-platform" ]; then

echo
echo "ERROR: trading-platform realm validation failed."
exit 1

fi

echo
echo "Realm validation successful."

echo
echo "Stage 06 identity foundation validation completed successfully."
