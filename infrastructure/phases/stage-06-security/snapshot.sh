#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
SNAPSHOT_DIR="$ROOT_DIR/.snapshots"

mkdir -p "$SNAPSHOT_DIR"

tar -czf \
"$SNAPSHOT_DIR/stage-06-security.tar.gz" \
"$ROOT_DIR/kubernetes/security" \
"$ROOT_DIR/scripts/security" \
"$ROOT_DIR/infrastructure/components/vault" \
"$ROOT_DIR/infrastructure/components/keycloak" \
"$ROOT_DIR/infrastructure/components/istio" \
"$ROOT_DIR/infrastructure/components/kong" \
"$ROOT_DIR/infrastructure/components/cert-manager"

echo
echo "Snapshot created:"
echo "$SNAPSHOT_DIR/stage-06-security.tar.gz"
