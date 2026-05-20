#!/bin/bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"

TIMESTAMP=$(date +%Y%m%d-%H%M%S)

BACKUP_DIR="$ROOT_DIR/backups/stage09-$TIMESTAMP"

mkdir -p "$BACKUP_DIR"

cp -r "$ROOT_DIR/infrastructure/phases/stage-09-observability" "$BACKUP_DIR/"

echo ""
echo "Backup completed:"
echo "$BACKUP_DIR"
echo ""
