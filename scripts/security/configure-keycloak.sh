#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Configuring Keycloak"
echo "========================================="

KEYCLOAK_POD=$(kubectl get pods -n auth \
-l app=keycloak \
-o jsonpath="{.items[0].metadata.name}")

echo
echo "Detected Keycloak pod:"
echo "$KEYCLOAK_POD"

echo
echo "Waiting for Keycloak readiness..."

kubectl wait \
--for=condition=Ready \
pod/"$KEYCLOAK_POD" \
-n auth \
--timeout=600s

ADMIN_PASSWORD=$(kubectl get secret \
keycloak-admin-secret \
-n auth \
-o jsonpath="{.data.admin-password}" \
| base64 -d)

echo
echo "Starting temporary port-forward..."

kubectl port-forward -n auth \
svc/keycloak 8080:8080 \
> /tmp/keycloak-portforward.log 2>&1 &

PF_PID=$!

sleep 10

cleanup() {
kill "$PF_PID" >/dev/null 2>&1 || true
}

trap cleanup EXIT

echo
echo "Requesting admin access token..."

ACCESS_TOKEN=$(curl -s \
-X POST \
http://localhost:8080/realms/master/protocol/openid-connect/token \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "username=admin" \
-d "password=$ADMIN_PASSWORD" \
-d "grant_type=password" \
-d "client_id=admin-cli" \
| jq -r '.access_token')

if [ -z "$ACCESS_TOKEN" ] || [ "$ACCESS_TOKEN" = "null" ]; then

echo
echo "ERROR: Failed to obtain Keycloak access token."
exit 1

fi

echo
echo "Access token acquired."

REALM_FILE="$HOME/corei/infrastructure/components/keycloak/realms/trading-platform-realm.json"

REALM_EXISTS=$(curl -s \
-H "Authorization: Bearer $ACCESS_TOKEN" \
http://localhost:8080/admin/realms/trading-platform \
| jq -r '.realm // empty')

if [ "$REALM_EXISTS" = "trading-platform" ]; then

echo
echo "Realm already exists."

else

echo
echo "Creating trading-platform realm..."

curl -s \
-X POST \
http://localhost:8080/admin/realms \
-H "Authorization: Bearer $ACCESS_TOKEN" \
-H "Content-Type: application/json" \
--data @"$REALM_FILE"

echo
echo "Realm created."

fi

echo
echo "Keycloak configuration completed successfully."
