#!/usr/bin/env bash

set -euo pipefail

TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)

OUTPUT="infrastructure/phases/stage-21-production-hardening/reports/image-inventory-${TIMESTAMP}.txt"

mkdir -p \
infrastructure/phases/stage-21-production-hardening/reports

echo "=====================================" > "${OUTPUT}"
echo "IMAGE INVENTORY" >> "${OUTPUT}"
echo "=====================================" >> "${OUTPUT}"

grep -R "image:" \
kubernetes \
infrastructure \
scripts \
2>/dev/null \
| sort >> "${OUTPUT}"

echo "[PASS] Inventory written:"
echo "${OUTPUT}"
