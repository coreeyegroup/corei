#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
BACKUP_DIR="$ROOT_DIR/infrastructure/state/stage-04/backups"

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +%Y%m%d-%H%M%S)

tar -czf \
"$BACKUP_DIR/stage-04-backup-$TIMESTAMP.tar.gz" \
"$ROOT_DIR/terraform" \
"$ROOT_DIR/scripts/infrastructure" \
"$ROOT_DIR/infrastructure/components"

echo
echo "Backup created:"
find "$BACKUP_DIR" -type f | sort
