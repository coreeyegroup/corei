#!/usr/bin/env bash

set -euo pipefail

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

SNAPSHOT_FILE="state/stage-10a/snapshots/stage-10a-${TIMESTAMP}.snapshot"

mkdir -p state/stage-10a/snapshots

cat > "${SNAPSHOT_FILE}" <<STATE
stage: stage-10a
status: initialized
timestamp: ${TIMESTAMP}
STATE

echo "Snapshot created:"
echo "${SNAPSHOT_FILE}"
