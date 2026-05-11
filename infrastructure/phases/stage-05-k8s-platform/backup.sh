#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
BACKUP_DIR="$ROOT_DIR/infrastructure/state/stage-05/backups"

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +%Y%m%d-%H%M%S)

tar -czf \
"$BACKUP_DIR/stage-05-backup-$TIMESTAMP.tar.gz" \
"$ROOT_DIR/kubernetes" \
"$ROOT_DIR/scripts/kubernetes" \
"$ROOT_DIR/infrastructure/phases/stage-05-k8s-platform"

echo
echo "Backup created:"
find "$BACKUP_DIR" -type f | sort
