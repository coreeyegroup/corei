# PLATFORM PORTFOLIO AUTHORITY

Portfolio state MUST:
- derive from event history
- support deterministic replay
- support immutable snapshots
- support lineage reconstruction
- prohibit unmanaged mutation

State(t) = f(EventLog[0→t])
