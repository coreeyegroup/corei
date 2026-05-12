#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
BACKUP_DIR="$ROOT_DIR/infrastructure/state/stage-06/backups"

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +%Y%m%d-%H%M%S)

tar -czf \
"$BACKUP_DIR/stage-06-backup-$TIMESTAMP.tar.gz" \
"$ROOT_DIR/kubernetes/security" \
"$ROOT_DIR/scripts/security" \
"$ROOT_DIR/infrastructure/components/vault" \
"$ROOT_DIR/infrastructure/components/keycloak" \
"$ROOT_DIR/infrastructure/components/istio" \
"$ROOT_DIR/infrastructure/components/kong" \
"$ROOT_DIR/infrastructure/components/cert-manager"

echo
echo "Backup created:"
find "$BACKUP_DIR" -type f | sort
