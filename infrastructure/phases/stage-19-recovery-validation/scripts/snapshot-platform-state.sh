#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "========================================="
echo "STAGE-19 PLATFORM STATE SNAPSHOT"
echo "========================================="

echo "[1/5] Kafka offset snapshot"
bash "${ROOT_DIR}/scripts/snapshot-kafka-offsets.sh"

echo "[2/5] PostgreSQL snapshot"
bash "${ROOT_DIR}/scripts/snapshot-postgres.sh"

echo "[3/5] Redis snapshot"
bash "${ROOT_DIR}/scripts/snapshot-redis.sh"

echo "[4/5] Kubernetes state snapshot"
bash "${ROOT_DIR}/scripts/snapshot-k8s-state.sh"

echo "[5/5] Replay hash generation"
bash "${ROOT_DIR}/scripts/generate-replay-hashes.sh"

echo "========================================="
echo "PLATFORM SNAPSHOT COMPLETE"
echo "========================================="
