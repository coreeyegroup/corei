# order-engine-service

## PURPOSE

Converts:

SizedExecutionIntent
→ ExecutionOrder

under deterministic institutional order governance.

## RESPONSIBILITIES

- deterministic order construction
- immutable order identity generation
- execution-state governance
- order hashing governance
- broker-route normalization
- lineage preservation

## GOVERNANCE RULES

- deterministic order hashing mandatory
- immutable order identity mandatory
- replay-safe execution-state lifecycle mandatory
- lineage preservation mandatory
- execution-state corruption forbidden
