# PORTFOLIO REPLAY GOVERNANCE

## AUTHORITATIVE REPLAY LAW

Replay(state_t) == Original(state_t)

## REPLAY GOVERNANCE

All replay execution must remain:
- deterministic
- replay-safe
- lineage-reconstructable

## ORDERING GOVERNANCE

Replay ordering must preserve:
- partition ordering
- event sequencing
- timestamp ordering

## HASH GOVERNANCE

Replay hash equality mandatory.

## FINANCIAL GOVERNANCE

Replay financial arithmetic:
- BIGINT only
- fixed-point only
- deterministic only

FLOAT prohibited.
