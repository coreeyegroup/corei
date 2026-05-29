#!/usr/bin/env bash

set -euo pipefail

OUT="state/security/kafka/design/current-listener-config.txt"

kubectl exec -n kafka kafka-0 -- \
cat /tmp/server.properties \
> "$OUT"

echo
echo "[PASS] Listener configuration extracted"
