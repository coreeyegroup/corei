# INSTRUMENT MONITORING GOVERNANCE

Institutional deterministic monitoring governance.

Canonical flow:

InstrumentScreened_v1
→ monitoring evaluation
→ state transition
→ InstrumentMonitorEvent_v1

Governance laws:

- deterministic state transitions mandatory
- replay equivalence mandatory
- event_time authoritative
- FLOAT prohibited

Governed states:

READY_FOR_ENTRY
IN_TRADE
APPROACHING_EXIT
NO_TRADE
BLOCKED
