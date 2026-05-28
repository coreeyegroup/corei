# account-routing-service

## PURPOSE

Converts:

ExecutionIntent
→ PerAccountIntent

under deterministic account-routing governance.

## RESPONSIBILITIES

- account eligibility filtering
- operation-mode enforcement
- deterministic account routing
- per-account lineage extension
- Kafka routing lifecycle

## GOVERNANCE RULES

- deterministic routing mandatory
- disabled accounts forbidden
- operation-mode enforcement mandatory
- replay-safe dispatch mandatory
