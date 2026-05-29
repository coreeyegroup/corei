#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-B TLS FOUNDATION"
echo "====================================="

bash infrastructure/components/kafka/tls/generate-ca.sh

bash infrastructure/components/kafka/tls/generate-broker-cert.sh

bash infrastructure/components/kafka/tls/create-kafka-tls-secret.sh

bash infrastructure/components/kafka/tls/validate-kafka-tls.sh

echo
echo "[PASS] Stage-21F-B completed"
