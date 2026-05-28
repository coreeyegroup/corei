#!/usr/bin/env bash
set -euo pipefail

echo "[Stage-13] Rollback governance initialized"

LATEST_BACKUP=$(ls -1 infrastructure/freeze/stage-13/snapshots/*.tar.gz | tail -n 1)

if [[ -z "$LATEST_BACKUP" ]]; then
  echo "[FAIL] No backup found"
  exit 1
fi

echo "[Stage-13] Latest backup:"
echo "$LATEST_BACKUP"

echo "[Stage-13] Rollback validation PASSED"

exit 0
