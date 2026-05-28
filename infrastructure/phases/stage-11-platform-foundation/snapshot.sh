#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../../.. && pwd)"

SNAPSHOT_DIR="${ROOT_DIR}/state/stage-11/snapshots"

mkdir -p "${SNAPSHOT_DIR}"

SNAPSHOT_FILE="${SNAPSHOT_DIR}/stage-11-$(date +%Y%m%d-%H%M%S).snapshot"

tree \
    "${ROOT_DIR}/core_platform" \
    "${ROOT_DIR}/services" \
    > "${SNAPSHOT_FILE}"

echo "Snapshot created:"
echo "${SNAPSHOT_FILE#${ROOT_DIR}/}"
