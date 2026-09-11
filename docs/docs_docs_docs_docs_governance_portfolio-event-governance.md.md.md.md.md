# PORTFOLIO EVENT GOVERNANCE

## AUTHORITATIVE EVENT MODEL

State(t) = f(EventLog[0→t])

Kafka remains authoritative event source-of-truth.

## AUTHORITATIVE STREAMS

portfolio_state_stream
position_state_stream
pnl_stream
exposure_stream
allocation_stream
capital_state_stream

## PARTITION GOVERNANCE

partition_key = account_id + instrument

## REPLAY GOVERNANCE

Replay(state_t) == Original(state_t)

## FINANCIAL GOVERNANCE

All financial arithmetic:
- BIGINT
- deterministic
- replay-safe

FLOAT prohibited.


## CAPITAL REPLAY GOVERNANCE

Capital allocation transitions must remain:
- deterministic
- replay-safe
- lineage-reconstructable

Cross-partition capital mutation prohibited.
