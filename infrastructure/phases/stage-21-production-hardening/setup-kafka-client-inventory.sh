#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-D CLIENT INVENTORY"
echo "====================================="

bash scripts/security/kafka/discover-kafka-clients.sh

bash scripts/security/kafka/build-client-inventory.sh

bash scripts/security/kafka/discover-runtime-clients.sh

bash scripts/security/kafka/build-migration-matrix.sh

bash scripts/security/kafka/validate-client-inventory.sh

echo
echo "[PASS] Stage-21F-D completed"
