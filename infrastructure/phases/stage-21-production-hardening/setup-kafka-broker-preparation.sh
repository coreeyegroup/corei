#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-E BROKER PREPARATION"
echo "====================================="

bash scripts/security/kafka/snapshot-broker-config.sh

bash scripts/security/kafka/snapshot-runtime-state.sh

bash scripts/security/kafka/validate-preparation.sh

echo
echo "[PASS] Stage-21F-E completed"
