#!/bin/bash

set -e

echo "========================================="
echo "TIMESCALEDB RETENTION GOVERNANCE"
echo "========================================="

echo "[INFO] Applying retention policies..."

kubectl exec -i timescaledb-0 -n storage -- \
psql -U postgres -d marketdb <<'SQL'

SELECT add_retention_policy(
    'ticks',
    INTERVAL '90 days',
    if_not_exists => TRUE
);

SELECT add_retention_policy(
    'features',
    INTERVAL '7 days',
    if_not_exists => TRUE
);

SQL

echo "[INFO] Applying compression policies..."

kubectl exec -i timescaledb-0 -n storage -- \
psql -U postgres -d marketdb <<'SQL'

ALTER TABLE ticks
SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'symbol'
);

ALTER TABLE features
SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'symbol'
);

SELECT add_compression_policy(
    'ticks',
    INTERVAL '7 days',
    if_not_exists => TRUE
);

SELECT add_compression_policy(
    'features',
    INTERVAL '1 day',
    if_not_exists => TRUE
);

SQL

echo "========================================="
echo "[PASS] Retention governance applied"
echo "========================================="
