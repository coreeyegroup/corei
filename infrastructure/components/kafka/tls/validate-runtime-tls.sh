#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "RUNTIME TLS VALIDATION"
echo "====================================="

test -f state/security/kafka/runtime-tls/keystore.jks

test -f state/security/kafka/runtime-tls/truststore.jks

kubectl get secret kafka-runtime-tls \
-n kafka >/dev/null

echo
echo "[PASS] Runtime TLS validation complete"
