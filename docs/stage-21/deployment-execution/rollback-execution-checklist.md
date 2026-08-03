# ROLLBACK EXECUTION CHECKLIST

Trigger rollback immediately upon:

CrashLoopBackOff

Readiness failure

Listener failure

TLS failure

SCRAM failure

Deployment timeout

---

Rollback steps

Restore known-good StatefulSet

Wait for recovery

Verify readiness

Verify broker health

Collect evidence

