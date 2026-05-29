#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "LONGHORN STORAGECLASS RECONCILIATION"
echo "====================================="

kubectl patch storageclass longhorn \
--type merge \
-p '{
  "parameters": {
    "numberOfReplicas":"1"
  }
}'

echo
echo "[PASS] StorageClass replica count normalized to 1"
