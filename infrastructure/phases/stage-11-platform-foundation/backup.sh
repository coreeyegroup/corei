#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../../.. && pwd)"

BACKUP_DIR="${ROOT_DIR}/state/stage-11/backups"

mkdir -p "${BACKUP_DIR}"

tar -czf \
"${BACKUP_DIR}/stage-11-platform-backup.tar.gz" \
"${ROOT_DIR}/core_platform" \
"${ROOT_DIR}/services" \
> /dev/null 2>&1

echo "Backup completed"
