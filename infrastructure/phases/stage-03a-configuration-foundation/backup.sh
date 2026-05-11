#!/usr/bin/env bash

set -euo pipefail

BACKUP_DIR="$HOME/corei/infrastructure/state/stage-03a/backups"

mkdir -p "$BACKUP_DIR"

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

tar -czf \
"$BACKUP_DIR/stage-03a-config-backup-$TIMESTAMP.tar.gz" \
"$HOME/corei/infrastructure/config"

echo "Backup created:"
find "$BACKUP_DIR" -type f | sort
