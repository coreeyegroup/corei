#!/usr/bin/env bash

set -euo pipefail

kubectl delete secret kafka-tls \
-n kafka \
--ignore-not-found

kubectl create secret tls kafka-tls \
--cert=state/security/kafka/broker.crt \
--key=state/security/kafka/broker.key \
-n kafka

echo
echo "[PASS] Kafka TLS secret created"
