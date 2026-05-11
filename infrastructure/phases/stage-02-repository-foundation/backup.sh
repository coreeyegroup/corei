#!/usr/bin/env bash

set -euo pipefail

BACKUP_DIR="$HOME/corei/infrastructure/state/stage-02/backup"

mkdir -p "$BACKUP_DIR"

ARCHIVE="$BACKUP_DIR/corei-stage02-$(date +%Y%m%d-%H%M%S).tar.gz"

tar -czf "$ARCHIVE" \
--exclude=".git" \
--exclude="infrastructure/state" \
--exclude=".snapshots" \
"$HOME/corei"

echo "Backup created:"
echo "$ARCHIVE"
