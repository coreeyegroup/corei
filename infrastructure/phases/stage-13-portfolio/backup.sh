#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="infrastructure/freeze/stage-13/snapshots"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"

tar -czf "$BACKUP_DIR/stage13-backup-$TIMESTAMP.tar.gz" \
  docs \
  infrastructure \
  kubernetes \
  schemas \
  services

echo "[Stage-13] Backup completed"
echo "$BACKUP_DIR/stage13-backup-$TIMESTAMP.tar.gz"
