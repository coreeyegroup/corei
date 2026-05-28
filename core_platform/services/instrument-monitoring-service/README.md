# INSTRUMENT MONITORING SERVICE

Deterministic instrument timing analysis service.

Responsibilities:
- entry timing
- exit timing
- monitoring state transitions
- replay-safe monitoring lineage

States:
READY_FOR_ENTRY
IN_TRADE
APPROACHING_EXIT
NO_TRADE
BLOCKED

Emits:
instrument_monitor_events
