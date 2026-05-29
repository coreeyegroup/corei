#!/usr/bin/env bash

set -euo pipefail

mkdir -p state/security/kafka

openssl genrsa \
-out state/security/kafka/broker.key \
4096

openssl req \
-new \
-key state/security/kafka/broker.key \
-subj "/CN=kafka.kafka.svc.cluster.local" \
-out state/security/kafka/broker.csr

openssl x509 \
-req \
-in state/security/kafka/broker.csr \
-CA state/security/kafka/ca.crt \
-CAkey state/security/kafka/ca.key \
-CAcreateserial \
-out state/security/kafka/broker.crt \
-days 3650 \
-sha256

echo
echo "[PASS] Broker certificate generated"
