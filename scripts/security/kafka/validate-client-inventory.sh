#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "CLIENT INVENTORY VALIDATION"
echo "====================================="

test -f infrastructure/phases/stage-21-production-hardening/reports/kafka-client-discovery.txt

test -f infrastructure/phases/stage-21-production-hardening/reports/runtime-kafka-clients.txt

test -f infrastructure/phases/stage-21-production-hardening/reports/kafka-migration-matrix.md

test -f state/security/kafka/client-inventory/client-inventory.txt

echo
echo "[PASS] Client inventory validation complete"
