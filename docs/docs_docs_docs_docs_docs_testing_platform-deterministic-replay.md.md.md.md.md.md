# PLATFORM DETERMINISTIC REPLAY

Replay MUST:
- reproduce identical portfolio state
- validate snapshot consistency
- validate lineage integrity
- prohibit replay divergence

Replay(EventLog[0→t]) == OriginalState(t)
