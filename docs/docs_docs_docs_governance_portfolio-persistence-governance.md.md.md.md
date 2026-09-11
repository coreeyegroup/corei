# PORTFOLIO PERSISTENCE GOVERNANCE

## AUTHORITATIVE STORAGE MODEL

Kafka:
    authoritative event lineage

PostgreSQL:
    relational financial materialization

TimescaleDB:
    historical financial analytics

Redis:
    derived cache only

## FINANCIAL GOVERNANCE

All financial persistence:
- BIGINT
- fixed-point
- deterministic

FLOAT prohibited.

## REPLAY GOVERNANCE

Replay(state_t) == Original(state_t)

## IMMUTABLE GOVERNANCE

pnl_ledger:
    immutable financial lineage

## RECONSTRUCTION GOVERNANCE

All financial state must remain reconstructable from event lineage.
