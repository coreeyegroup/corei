# PORTFOLIO DOMAIN ARCHITECTURE

## AUTHORITATIVE FINANCIAL DOMAINS

portfolio-service:
    authoritative financial state

exposure-service:
    derived exposure aggregation

capital-partition-service:
    deterministic capital allocation isolation

## AUTHORITATIVE GOVERNANCE MODEL

Kafka:
    authoritative event source-of-truth

portfolio-service:
    authoritative financial state authority

Snapshots:
    derived materialized state only

## BOUNDED CONTEXT GOVERNANCE

Each service owns exactly one bounded context.

No overlap permitted.

## REPLAY GOVERNANCE

Replay reconstruction mandatory.

Replay(state_t) == Original(state_t)

## FINANCIAL GOVERNANCE

All financial arithmetic:
- BIGINT
- fixed-point
- deterministic

FLOAT prohibited.

## CAPITAL GOVERNANCE

No capital bleed permitted between:
- strategies
- accounts
- partitions
- allocation groups
