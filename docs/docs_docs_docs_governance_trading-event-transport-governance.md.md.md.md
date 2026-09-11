# TRADING EVENT TRANSPORT GOVERNANCE

Institutional event transport governance.

Canonical transport flow:

instrument_screened
→ instrument_monitor_events
→ signal_events
→ decision_events

Governance laws:

- deterministic event routing mandatory
- event_time authoritative
- replay-safe propagation mandatory
- transport lineage reconstructable
- paper-mode transport only
- FLOAT prohibited
