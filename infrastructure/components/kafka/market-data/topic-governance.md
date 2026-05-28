# MARKET-DATA TOPIC GOVERNANCE

Authoritative Kafka topic governance for Stage-12 market-data topology.

## GOVERNANCE RULES

- Kafka is authoritative event source-of-truth
- Replay-safe partitioning mandatory
- Deterministic retention mandatory
- No unmanaged topic creation
- No ad-hoc topic mutation
