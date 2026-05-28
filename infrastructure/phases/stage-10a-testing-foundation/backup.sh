#!/usr/bin/env bash

set -euo pipefail

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

mkdir -p state/stage-10a/backups

tar -czf \
"state/stage-10a/backups/stage-10a-backup-${TIMESTAMP}.tar.gz" \
tests \
scripts/testing \
docs/testing \
infrastructure/phases/stage-10a-testing-foundation

echo "Backup completed"
