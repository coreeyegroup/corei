# COREI — SERVICE OWNERSHIP GOVERNANCE

## PURPOSE

Defines bounded ownership rules for all runtime services.

---

# GOVERNANCE PRINCIPLES

1. Every service owns one bounded responsibility.
2. Cross-service mutation is prohibited.
3. Services communicate through governed contracts.
4. Replay safety is mandatory.
5. Observability is mandatory.

---

# REQUIRED SERVICE SURFACES

Every service must expose:

- /health
- /metrics
- /version
- /config

---

# PROHIBITED PATTERNS

- shared mutable ownership
- hidden orchestration
- direct cross-service database access
- undocumented runtime coupling

---

# GOVERNANCE STATUS

Bounded service ownership is authoritative runtime law.

