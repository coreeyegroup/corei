#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="$HOME/corei/infrastructure/state/stage-01/backups"

mkdir -p "$BACKUP_DIR"

BACKUP_FILE="$BACKUP_DIR/stage-01-backup-$(date +%Y%m%d-%H%M%S).tar.gz"

tar -czf "$BACKUP_FILE" \
"$HOME/corei/infrastructure/config" \
"$HOME/corei/infrastructure/phases/stage-01-machine-foundation"

echo "[INFO] Backup created -> $BACKUP_FILE"
