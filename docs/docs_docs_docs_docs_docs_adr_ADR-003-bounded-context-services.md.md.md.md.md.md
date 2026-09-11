# ADR-003 — Bounded Context Service Architecture

## STATUS

Accepted

---

# CONTEXT

Shared ownership services create operational entropy and deployment instability.

---

# DECISION

All services must operate within bounded ownership domains.

Cross-domain mutation is prohibited.

---

# CONSEQUENCES

## Positive

- deterministic ownership
- isolated failures
- operational clarity
- independent scaling

---

## Negative

- increased event coordination
- more explicit contracts

---

# GOVERNANCE

Bounded ownership takes precedence over convenience coupling.
