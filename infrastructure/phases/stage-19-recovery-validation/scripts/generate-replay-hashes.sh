#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

HASH_DIR="${ROOT_DIR}/state/replay-hashes"

mkdir -p "${HASH_DIR}"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

echo "[Replay Hash] Generating deterministic hashes"

find "${ROOT_DIR}/state/pre-recovery" -type f \
  -exec sha256sum {} \; \
  | sort \
  > "${HASH_DIR}/replay-hashes-${TIMESTAMP}.txt"

echo "[Replay Hash] Hash generation complete"
