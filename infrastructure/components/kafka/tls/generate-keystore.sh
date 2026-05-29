#!/usr/bin/env bash

set -euo pipefail

mkdir -p state/security/kafka/runtime-tls

openssl pkcs12 \
-export \
-in state/security/kafka/broker.crt \
-inkey state/security/kafka/broker.key \
-name kafka-broker \
-out state/security/kafka/runtime-tls/kafka.p12 \
-password pass:changeit

echo
echo "[PASS] PKCS12 keystore generated"
