#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-F LISTENER RECONCILIATION"
echo "====================================="

bash scripts/security/kafka/extract-listener-config.sh

bash scripts/security/kafka/validate-listener-reconciliation.sh

echo
echo "[PASS] Stage-21F-F completed"
