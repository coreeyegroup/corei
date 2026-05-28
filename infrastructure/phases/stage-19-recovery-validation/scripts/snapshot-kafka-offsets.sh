#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

OUTPUT_DIR="${ROOT_DIR}/state/pre-recovery/kafka-offsets"

mkdir -p "${OUTPUT_DIR}"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

KAFKA_BIN="/opt/kafka/bin/kafka-consumer-groups.sh"

echo "[Snapshot] Capturing Kafka consumer group offsets"

kubectl exec -n kafka kafka-0 -- \
  "${KAFKA_BIN}" \
  --bootstrap-server localhost:9092 \
  --all-groups \
  --describe \
  > "${OUTPUT_DIR}/kafka-offsets-${TIMESTAMP}.txt"

echo "[Snapshot] Kafka offsets captured"
