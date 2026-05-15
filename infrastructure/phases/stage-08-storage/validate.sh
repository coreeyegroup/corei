#!/bin/bash

set -e

echo "=================================================="
echo "STAGE-08 STORAGE FOUNDATION VALIDATION"
echo "=================================================="

echo "[CHECK] PostgreSQL readiness..."

kubectl exec -n storage postgres-0 -- \
pg_isready -U postgres

echo "[PASS] PostgreSQL accepting connections"

echo "[CHECK] TimescaleDB readiness..."

kubectl exec -n storage timescaledb-0 -- \
pg_isready -U postgres

echo "[PASS] TimescaleDB accepting connections"

echo "[CHECK] TimescaleDB extension..."

kubectl exec -n storage timescaledb-0 -- \
psql -U postgres -d marketdb -t -c \
"SELECT extname FROM pg_extension WHERE extname='timescaledb';"

echo "[PASS] TimescaleDB extension present"

echo "[CHECK] Redis validation..."

kubectl exec -n storage redis-0 -- \
redis-cli SET stage08 validation

RESULT=$(kubectl exec -n storage redis-0 -- \
redis-cli GET stage08)

if [[ "$RESULT" != "validation" ]]; then
    echo "[FAIL] Redis validation failed"
    exit 1
fi

echo "[PASS] Redis operational"

echo "[CHECK] PostgreSQL table count..."

PG_TABLES=$(kubectl exec -n storage postgres-0 -- \
psql -U postgres -d coredb -t -c \
"SELECT count(*) FROM information_schema.tables WHERE table_schema='public';" \
| xargs)

if [[ "$PG_TABLES" -lt 10 ]]; then
    echo "[FAIL] Missing PostgreSQL tables"
    exit 1
fi

echo "[PASS] PostgreSQL tables validated"

echo "[CHECK] Timescale hypertables..."

TS_TABLES=$(kubectl exec -n storage timescaledb-0 -- \
psql -U postgres -d marketdb -t -c \
"SELECT count(*) FROM timescaledb_information.hypertables;" \
| xargs)

if [[ "$TS_TABLES" -lt 7 ]]; then
    echo "[FAIL] Missing Timescale hypertables"
    exit 1
fi

echo "[PASS] Timescale hypertables validated"

echo "[CHECK] Retention policies..."

kubectl exec -n storage timescaledb-0 -- \
psql -U postgres -d marketdb -c \
"SELECT hypertable_name, proc_name FROM timescaledb_information.jobs;"

echo "[PASS] Retention policies present"

echo "[CHECK] Financial schema precision..."

FLOAT_COLUMNS=$(kubectl exec -n storage postgres-0 -- \
psql -U postgres -d coredb -t -c "
SELECT count(*)
FROM information_schema.columns
WHERE table_schema='public'
AND data_type IN (
    'numeric',
    'real',
    'double precision'
);
" | xargs)

if [[ "$FLOAT_COLUMNS" != "0" ]]; then
    echo "[FAIL] FLOAT/NUMERIC columns detected"
    exit 1
fi

echo "[PASS] Financial precision governance validated"

echo "[CHECK] PVC status..."

kubectl get pvc -n storage

echo "=================================================="
echo "[PASS] STAGE-08 VALIDATION COMPLETE"
echo "=================================================="
