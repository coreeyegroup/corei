# STAGE-14 TRADING EVENT GOVERNANCE

Authoritative Kafka governance for trading intelligence.

Canonical partition governance:

instrument_screened
partition_key = instrument_id

instrument_monitor_events
partition_key = instrument_id

signal_events
partition_key = strategy_id + instrument_id

decision_events
partition_key = instrument_id

Canonical governance laws:

- replay-safe ordering mandatory
- event_time authoritative
- FLOAT prohibited
- immutable event lineage mandatory
- replay equivalence mandatory

Retention governance:

signal_events
decision_events
retention_ms = -1

Reason:
institutional replay preservation.
