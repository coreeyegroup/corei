# Broker Onboarding Governance

## Purpose

Controlled onboarding of the first live broker connection.

This process:
- validates authenticated broker connectivity
- validates market-data continuity
- validates EMS connectivity
- validates execution-path integrity

This process does NOT:
- enable autonomous trading
- enable unattended execution
- bypass LIVE_SEMI governance

---

# Governance Constraints

Before onboarding:
- semantic governance must pass
- Stage 20 orchestrator must pass
- Stage 17 validation gate must pass
- Stage 19 recovery gate must pass

After onboarding:
- LIVE_AUTO remains disabled
- LIVE trading remains governance-controlled
- execution remains supervised

---

# Operational Safety Model

The broker onboarding process validates:
- connectivity
- heartbeat continuity
- market-data integrity
- execution-path reachability

without:
- autonomous live order execution
