#!/usr/bin/env bash

set -euo pipefail

OUT="infrastructure/phases/stage-21-production-hardening/reports/kafka-migration-matrix.md"

cat > "$OUT" <<EOM
# KAFKA SASL_SSL MIGRATION MATRIX

STATUS: DISCOVERY

Current:
    PLAINTEXT

Target:
    SASL_SSL

Authentication:
    SCRAM-SHA-512

Credential Source:
    Vault

Migration:
    Pending Stage-21F-E

EOM

echo
echo "[PASS] Migration matrix written:"
echo "$OUT"
