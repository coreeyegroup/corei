#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

OUTPUT_DIR="${ROOT_DIR}/state/deadletter/malformed-events"

mkdir -p "${OUTPUT_DIR}"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

EVENT_FILE="${OUTPUT_DIR}/malformed-event-${TIMESTAMP}.json"

echo "========================================="
echo "GENERATE MALFORMED EVENT"
echo "========================================="

cat > "${EVENT_FILE}" <<EOD
{
  "event_id": null,
  "event_type": "INVALID_EVENT",
  "payload": {
    "symbol": null,
    "price": "INVALID_PRICE"
  },
  "timestamp": "CORRUPTED"
}
EOD

echo "[DLQ] Malformed event generated"

echo "${EVENT_FILE}"

echo "========================================="
