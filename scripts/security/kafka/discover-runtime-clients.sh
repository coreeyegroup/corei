#!/usr/bin/env bash

set -euo pipefail

OUT="infrastructure/phases/stage-21-production-hardening/reports/runtime-kafka-clients.txt"

kubectl get deployment,statefulset,daemonset \
-A -o yaml \
| grep -n "kafka" \
> "$OUT" || true

echo
echo "[PASS] Runtime discovery written:"
echo "$OUT"
