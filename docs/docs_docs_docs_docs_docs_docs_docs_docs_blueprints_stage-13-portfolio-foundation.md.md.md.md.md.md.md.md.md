# STAGE-13 — PORTFOLIO FOUNDATION

## PURPOSE

Establish authoritative portfolio state governance.

Portfolio state becomes authoritative financial truth.

Risk, execution, exposure, allocation, and replay all derive from this state.

## AUTHORITATIVE GOVERNANCE MODEL

portfolio-service:
    authoritative financial state authority

exposure-service:
    authoritative exposure aggregation authority

capital-partition-service:
    authoritative capital allocation isolation authority

Kafka:
    authoritative event source-of-truth

## AUTHORITATIVE STATE LAW

State(t) = f(EventLog[0→t])

Snapshots are derived state only.

## FINANCIAL PRECISION GOVERNANCE

ALL financial values:
- BIGINT
- fixed-point
- deterministic

FLOAT prohibited.

## REPLAY GOVERNANCE

Replay(state_t) == Original(state_t)

Bit-level equality required.

## CAPITAL GOVERNANCE

No capital bleed between:
- strategies
- accounts
- partitions
- allocation groups
