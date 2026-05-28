#!/usr/bin/env bash

set -euo pipefail

BACKUP_TIMESTAMP="$1"

CURRENT_TIMESTAMP="$(date +%s)"

RPO_SECONDS=$((CURRENT_TIMESTAMP - BACKUP_TIMESTAMP))

RPO_MINUTES=$((RPO_SECONDS / 60))

echo "========================================="
echo "RPO MEASUREMENT"
echo "========================================="

echo "[RPO] Recovery Point (seconds): ${RPO_SECONDS}"

echo "[RPO] Recovery Point (minutes): ${RPO_MINUTES}"

if [[ "${RPO_MINUTES}" -lt 1 ]]; then
  echo "[PASS] RPO target satisfied (<1 minute)"
else
  echo "[WARN] RPO target exceeded"
fi

echo "========================================="
