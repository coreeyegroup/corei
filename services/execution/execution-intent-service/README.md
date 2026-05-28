# execution-intent-service

## PURPOSE

Converts:

TradeIntent
→ ExecutionIntent

under deterministic execution governance.

## RESPONSIBILITIES

- TradeIntent normalization
- execution metadata attachment
- lineage extension
- origin classification
- deterministic execution ID generation
- Kafka consume/produce lifecycle

## GOVERNANCE RULES

- NO strategy mutation
- NO floating-point arithmetic
- deterministic output mandatory
- replay-safe lineage mandatory
