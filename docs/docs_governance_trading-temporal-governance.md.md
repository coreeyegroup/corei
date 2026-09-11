# TRADING TEMPORAL GOVERNANCE

Institutional deterministic temporal governance.

Canonical lifecycle:

event_time
→ TTL evaluation
→ stale rejection
→ deterministic acceptance

Governance laws:

- event_time authoritative
- TTL must be deterministic
- stale signals prohibited
- replay-safe expiration mandatory
- system clock non-authoritative
- FLOAT prohibited
