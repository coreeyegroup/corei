#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "STAGE-21F-C SCRAM FOUNDATION"
echo "====================================="

bash scripts/security/kafka/create-scram-users.sh

bash scripts/security/kafka/store-scram-users-vault.sh

bash scripts/security/kafka/validate-scram-users.sh

echo
echo "[PASS] Stage-21F-C completed"
