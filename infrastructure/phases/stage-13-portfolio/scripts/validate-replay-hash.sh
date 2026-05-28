#!/usr/bin/env bash
set -euo pipefail

HASH_FILE="infrastructure/replay/portfolio/hashes/replay.sha256"

if [[ ! -f "$HASH_FILE" ]]; then
  echo "[FAIL] Missing replay hash"
  exit 1
fi

sha256sum -c "$HASH_FILE"

echo "[Stage-13] Replay hash validation PASSED"
