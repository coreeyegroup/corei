# ENGINEERING COMPLETION STANDARD

## AUTHORITATIVE PURPOSE

This document defines when engineering work is considered complete.

Completion is objective.

Completion is not based on opinion.

---

# COMPLETION CHECKLIST

| Requirement | Mandatory |
|-------------|------------|
| Existence Check Complete | YES |
| Description Complete | YES |
| Implementation Complete | YES |
| Validation Pass | YES |
| Documentation Complete | YES |

---

# PHASE COMPLETION MODEL

EXISTENCE CHECK
    PASS

DESCRIBE
    PASS

IMPLEMENT
    PASS

VALIDATE
    PASS

DOCUMENT
    PASS

---

# STATUS DEFINITIONS

## COMPLETE

All phases passed.

---

## PARTIAL

One or more phases incomplete.

---

## BLOCKED

Progress prevented by governance issue.

Examples:

- ownership conflict
- architecture conflict
- missing dependency

---

## FAILED

Validation or governance failure occurred.

Examples:

- replay failure
- determinism failure
- recovery failure

---

# GLOBAL RULE

If any phase fails:

    STATUS != COMPLETE

Partial completion is not completion.

