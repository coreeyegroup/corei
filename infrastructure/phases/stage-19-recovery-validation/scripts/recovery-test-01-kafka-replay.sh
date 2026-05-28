#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

LOG_FILE="${ROOT_DIR}/logs/recovery-test-01.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

echo "=================================================="
echo "STAGE-19 RECOVERY TEST 01 — KAFKA REPLAY"
echo "=================================================="

echo "[STEP-1] PRE-RECOVERY SNAPSHOT"

bash "${ROOT_DIR}/scripts/snapshot-platform-state.sh"

echo "[STEP-2] DESTROY MATERIALIZED STATE"

bash "${ROOT_DIR}/scripts/destroy-materialized-state.sh"

echo "[STEP-3] REPLAY KAFKA STATE"

bash "${ROOT_DIR}/scripts/replay-kafka-state.sh"

echo "[STEP-4] POST-RECOVERY SNAPSHOT"

bash "${ROOT_DIR}/scripts/snapshot-post-recovery.sh"

echo "[STEP-5] ASSERT REPLAY EQUALITY"

bash "${ROOT_DIR}/scripts/assert-replay-equality.sh"

echo "=================================================="
echo "RECOVERY TEST 01 COMPLETE"
echo "=================================================="
