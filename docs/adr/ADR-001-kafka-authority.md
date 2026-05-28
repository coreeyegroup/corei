# ADR-001 — Kafka As Authoritative Event Transport

## STATUS

Accepted

---

# CONTEXT

Corei requires deterministic event-driven communication between bounded runtime domains.

Direct service mutation creates:

- runtime coupling
- replay instability
- operational opacity

---

# DECISION

Kafka becomes the authoritative event transport substrate.

All cross-domain runtime communication must become event-driven.

---

# CONSEQUENCES

## Positive

- replay capability
- deterministic ordering
- observability
- lineage support
- operational decoupling

---

## Negative

- operational complexity
- event governance overhead
- schema governance requirements

---

# GOVERNANCE

Replay-first architecture takes precedence over implementation simplicity.
