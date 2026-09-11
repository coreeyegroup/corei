# ENGINEERING DECISION MATRIX

## AUTHORITATIVE PURPOSE

This document defines the mandatory decision framework for all engineering work within CORE.

It standardizes decision making across:

- platform stages
- services
- workflows
- APIs
- databases
- schemas
- infrastructure
- automation

This document answers:

    What action should be taken?

before implementation begins.

---

# DECISION MATRIX

| Situation | Decision | Action |
|------------|------------|------------|
| Capability already exists | REUSE | Use existing implementation |
| Capability partially exists | EXTEND | Extend existing implementation |
| Capability exists but ownership is incorrect | REDESIGN | Architecture review required |
| Capability does not exist | BUILD | New implementation permitted |
| Validation fails | RETURN | Return to implementation |
| Documentation missing | RETURN | Return to documentation |
| Ownership unclear | STOP | Resolve ownership |
| Architecture conflict | STOP | Architecture review required |
| Replay failure | STOP | Critical review required |
| Determinism failure | STOP | Critical review required |
| Recovery failure | STOP | Critical review required |

---

# IMPLEMENTATION DECISION RULE

IF EXISTS
    → REUSE

IF EXTENDABLE
    → EXTEND

IF OWNERSHIP CONFLICT EXISTS
    → REDESIGN

IF NOT PRESENT
    → BUILD

Implementation is the last option.

Discovery is always the first option.
