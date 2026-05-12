#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

echo "========================================="
echo "Stage 06 Security Foundation Setup"
echo "========================================="

"$ROOT_DIR/scripts/security/install-vault.sh"
"$ROOT_DIR/scripts/security/configure-vault.sh"

"$ROOT_DIR/scripts/security/install-keycloak.sh"
"$ROOT_DIR/scripts/security/configure-keycloak.sh"

"$ROOT_DIR/scripts/security/install-istio.sh"
"$ROOT_DIR/scripts/security/configure-istio.sh"

"$ROOT_DIR/scripts/security/install-kong.sh"
"$ROOT_DIR/scripts/security/configure-kong.sh"

"$ROOT_DIR/scripts/security/install-cert-manager.sh"
"$ROOT_DIR/scripts/security/configure-cert-manager.sh"

"$ROOT_DIR/scripts/security/install-falco.sh"

echo
echo "Stage 06 setup completed."
