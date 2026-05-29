#!/usr/bin/env bash

set -euo pipefail

mkdir -p state/security/kafka

openssl genrsa \
-out state/security/kafka/ca.key \
4096

openssl req \
-x509 \
-new \
-nodes \
-key state/security/kafka/ca.key \
-sha256 \
-days 3650 \
-subj "/CN=corei-kafka-ca" \
-out state/security/kafka/ca.crt

echo
echo "[PASS] Kafka CA generated"
