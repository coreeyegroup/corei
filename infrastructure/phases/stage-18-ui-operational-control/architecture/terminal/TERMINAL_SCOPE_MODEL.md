# TERMINAL SCOPE MODEL

## DOCUMENT PURPOSE

This document defines the authoritative scope boundaries of CORE TERMINAL.

The purpose of this document is to clearly separate terminal responsibilities from backend platform responsibilities.

CORE TERMINAL is a supervision and governance system.

CORE TERMINAL is not a business logic execution system.

---

# TERMINAL OWNERSHIP

CORE TERMINAL owns:

- Visibility
- Supervision
- Governance
- Operator Interaction
- Operational Control
- Approval Workflows
- Kill Switch Controls
- Audit Visibility
- Recovery Visibility
- Platform Observability
- Alert Visibility
- Search and Investigation
- Operational Workflows

---

# TERMINAL DOES NOT OWN

CORE TERMINAL does not own:

- Strategy Logic
- Signal Generation
- Portfolio Calculations
- Risk Calculations
- Execution Routing
- Broker Communication
- Market Data Processing
- Position Calculation
- PnL Calculation
- Replay Execution
- Recovery Execution

These responsibilities remain within authoritative backend services.

---

# TERMINAL AUTHORITY MODEL

CORE TERMINAL may:

- Observe
- Display
- Request
- Approve
- Reject
- Escalate
- Audit
- Supervise

CORE TERMINAL may not:

- Execute Trading Logic
- Execute Strategy Logic
- Execute Risk Logic
- Execute Portfolio Logic
- Execute Market Data Logic

The terminal remains a governance layer.

---

# OPERATOR COMMAND MODEL

Operator actions initiated through CORE TERMINAL are governance requests.

Examples:

- Strategy Pause Request
- Strategy Resume Request
- Kill Switch Request
- Recovery Approval Request
- Replay Approval Request

Backend systems remain the final execution authority.

---

# DOMAIN OWNERSHIP BOUNDARY

The terminal supervises the following domains:

- Operations
- Trading
- Execution
- Recovery
- Governance

The terminal does not replace the authoritative runtime systems operating inside those domains.

---

# DATA OWNERSHIP BOUNDARY

CORE TERMINAL consumes:

- Events
- Metrics
- Alerts
- Audit Records
- State Snapshots

CORE TERMINAL does not become the authoritative source of operational truth.

Authoritative truth remains within platform services and governed storage systems.

---

# RECOVERY BOUNDARY

CORE TERMINAL may:

- Visualize Recovery
- Supervise Recovery
- Approve Recovery
- Audit Recovery

CORE TERMINAL may not directly perform recovery operations.

Recovery execution remains the responsibility of recovery services.

---

# SECURITY BOUNDARY

CORE TERMINAL must respect:

- RBAC
- Governance Controls
- Audit Requirements
- Approval Requirements

The terminal must never bypass platform security controls.

---

# SCALE BOUNDARY

The scope of CORE TERMINAL must remain valid across:

- Single User Deployments
- Small Team Deployments
- Trading Desk Deployments
- Institutional Deployments
- Multi-Region Deployments

without changing responsibility boundaries.

---

# AUTHORITATIVE PRINCIPLE

CORE TERMINAL is responsible for supervision.

Backend systems are responsible for execution.

This separation is mandatory.
