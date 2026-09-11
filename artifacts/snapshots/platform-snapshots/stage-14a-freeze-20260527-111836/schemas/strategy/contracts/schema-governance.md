# STAGE-14 SCHEMA GOVERNANCE

Institutional schema governance rules:

- FLOAT prohibited
- DOUBLE prohibited
- event_time authoritative
- replay-safe serialization mandatory
- deterministic schema evolution mandatory

Canonical signal identity:

SHA256(
    instrument_id +
    direction +
    strength_bps +
    event_time +
    strategy_id
)

Canonical TradeIntent identity:

SHA256(
    ordered_signal_set +
    event_time +
    decision_context
)
