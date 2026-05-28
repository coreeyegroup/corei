# STRATEGY ENGINE GOVERNANCE

Institutional deterministic signal-generation governance.

Canonical flow:

InstrumentMonitorEvent_v1
→ strategy evaluation
→ Signal_v1

Governance laws:

- FLOAT prohibited
- deterministic signal generation mandatory
- replay equivalence mandatory
- SHA-256 signal identity mandatory
- event_time authoritative

Signal identity:

SHA256(
    instrument_id +
    direction +
    strength_bps +
    event_time +
    strategy_id
)
