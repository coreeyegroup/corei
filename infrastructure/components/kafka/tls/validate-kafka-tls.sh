#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "KAFKA TLS VALIDATION"
echo "====================================="

test -f state/security/kafka/ca.crt
test -f state/security/kafka/ca.key

test -f state/security/kafka/broker.crt
test -f state/security/kafka/broker.key

kubectl get secret kafka-tls \
-n kafka >/dev/null

echo
echo "[PASS] TLS validation complete"
