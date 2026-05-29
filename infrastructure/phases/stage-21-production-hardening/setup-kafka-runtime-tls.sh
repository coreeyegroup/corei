#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-H RUNTIME TLS"
echo "====================================="

bash infrastructure/components/kafka/tls/generate-keystore.sh

bash infrastructure/components/kafka/tls/generate-jks-keystore.sh

bash infrastructure/components/kafka/tls/generate-truststore.sh

bash infrastructure/components/kafka/tls/create-runtime-tls-secret.sh

bash infrastructure/components/kafka/tls/validate-runtime-tls.sh

echo
echo "[PASS] Stage-21F-H completed"
