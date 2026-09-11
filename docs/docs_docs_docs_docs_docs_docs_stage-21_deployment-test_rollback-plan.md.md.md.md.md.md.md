# ROLLBACK PLAN

OBJECTIVE

Restore Kafka immediately
upon deployment failure.

---

FAILURE CONDITIONS

CrashLoopBackOff

Listener failure

Readiness failure

Secret mount failure

TLS initialization failure

SCRAM initialization failure

---

ROLLBACK METHOD

Restore known-good StatefulSet.

Wait for pod recovery.

Verify readiness.

Verify broker health.

---

SUCCESS CRITERIA

Kafka restored.

No data loss.

No topic loss.

No offset loss.
