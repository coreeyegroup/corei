#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

PRE_HASH_DIR="${ROOT_DIR}/state/replay-hashes"

LATEST_HASH_FILE="$(ls -1 "${PRE_HASH_DIR}" | sort | tail -n 1)"

echo "[Compare] Comparing deterministic replay state"

sha256sum -c "${PRE_HASH_DIR}/${LATEST_HASH_FILE}"

echo "[Compare] Replay validation complete"
