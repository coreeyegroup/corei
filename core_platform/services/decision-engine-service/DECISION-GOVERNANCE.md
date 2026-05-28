# DECISION ENGINE GOVERNANCE

Institutional deterministic TradeIntent governance.

Canonical flow:

validated signals
→ aggregation
→ conflict resolution
→ TradeIntent_v1

Governance laws:

- FLOAT prohibited
- deterministic aggregation mandatory
- replay equivalence mandatory
- immutable priority hierarchy mandatory
- event_time authoritative

TradeIntent identity:

SHA256(
    instrument_id +
    ordered_signal_set +
    event_time
)
