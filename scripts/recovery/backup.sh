#!/usr/bin/env bash

set -euo pipefail

SRC="/var/corei"
DEST="$HOME/corei/backups"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

mkdir -p "$DEST"

tar -czf "$DEST/corei_backup_$TIMESTAMP.tar.gz" "$SRC"

ls -tp "$DEST" | \
grep -v '/$' | \
tail -n +8 | \
xargs -I {} rm -- "$DEST/{}"
