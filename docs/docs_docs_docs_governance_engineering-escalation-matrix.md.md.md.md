# ENGINEERING ESCALATION MATRIX

## AUTHORITATIVE PURPOSE

This document defines when execution must stop and escalate for review.

Escalation exists to protect:

- architecture
- governance
- determinism
- recoverability
- ownership boundaries

---

# ESCALATION MATRIX

| Situation | Escalation Level |
|------------|------------|
| Ownership conflict | Architecture Review |
| Duplicate ownership | Architecture Review |
| Service boundary violation | Architecture Review |
| Workflow ownership conflict | Architecture Review |
| Schema ownership conflict | Architecture Review |
| Architecture violation | Architecture Review |
| Validation failure | Engineering Review |
| Replay mismatch | Critical Review |
| Determinism failure | Critical Review |
| Traceability failure | Critical Review |
| Recovery failure | Critical Review |
| Data corruption risk | Critical Review |
| Security boundary violation | Critical Review |

---

# ARCHITECTURE REVIEW REQUIRED

Required for:

- ownership conflicts
- duplicate responsibilities
- service boundary violations
- workflow boundary violations
- schema ownership conflicts

---

# CRITICAL REVIEW REQUIRED

Required for:

- replay failures
- determinism failures
- recovery failures
- corruption risks
- security violations

---

# GLOBAL RULE

If escalation is required:

    STOP

Do not continue implementation until review is completed.
