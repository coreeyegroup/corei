#!/usr/bin/env bash

set -euo pipefail

OUT="infrastructure/phases/stage-21-production-hardening/reports/kafka-client-discovery.txt"

echo "=====================================" > "$OUT"
echo "KAFKA CLIENT DISCOVERY" >> "$OUT"
echo "=====================================" >> "$OUT"
echo >> "$OUT"

grep -R \
"kafka.kafka.svc.cluster.local" \
infrastructure \
kubernetes \
scripts \
2>/dev/null >> "$OUT" || true

echo >> "$OUT"
echo "=====================================" >> "$OUT"

echo "[PASS] Discovery written:"
echo "$OUT"
