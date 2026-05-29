#!/usr/bin/env bash

set -euo pipefail

mkdir -p \
state/security/kafka/client-inventory

REPORT="state/security/kafka/client-inventory/client-inventory.txt"

echo "=====================================" > "$REPORT"
echo "KAFKA CLIENT INVENTORY" >> "$REPORT"
echo "=====================================" >> "$REPORT"
echo >> "$REPORT"

grep -R \
"kafka.kafka.svc.cluster.local" \
infrastructure \
kubernetes \
scripts \
2>/dev/null \
| cut -d: -f1 \
| sort -u >> "$REPORT"

echo
echo "[PASS] Inventory written:"
echo "$REPORT"
