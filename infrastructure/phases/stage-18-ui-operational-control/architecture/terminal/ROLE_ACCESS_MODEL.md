# ROLE ACCESS MODEL

## DOCUMENT PURPOSE

This document defines the authoritative role access model for CORE TERMINAL.

The purpose of this document is to establish visibility boundaries, operational authority, governance authority, and control authority for all terminal operators.

This model serves as the foundation for:

- RBAC
- Governance Controls
- Approval Controls
- Audit Controls
- Recovery Controls
- Kill Switch Controls

---

# ACCESS PRINCIPLE

Visibility and authority are separate concepts.

An operator may have visibility into a domain without possessing authority to modify that domain.

All permissions shall follow least-privilege principles.

---

# ACCESS HIERARCHY

CORE TERMINAL permissions follow:

Visibility
    ↓
Interaction
    ↓
Control
    ↓
Approval
    ↓
Governance

Higher authority levels inherit lower authority levels.

---

# ROLE 01

## ADMINISTRATOR

Purpose:

Platform governance authority.

Visibility:

- Operations
- Trading
- Execution
- Recovery
- Governance

Authority:

- Full Governance Authority
- User Management
- Permission Management
- Terminal Configuration

Approvals:

- All Approval Categories

Restrictions:

- All actions remain audited.

---

# ROLE 02

## PLATFORM ENGINEER

Purpose:

Platform operational authority.

Visibility:

- Operations
- Execution
- Recovery
- Governance

Authority:

- Infrastructure Controls
- Service Controls
- Recovery Controls

Approvals:

- Operational Approvals
- Recovery Approvals

Restrictions:

- Cannot modify trading governance.

---

# ROLE 03

## OPERATIONS

Purpose:

Daily operational supervision.

Visibility:

- Operations
- Execution
- Recovery
- Governance

Authority:

- Operational Workflow Controls
- Incident Workflow Controls

Approvals:

- Operational Workflows

Restrictions:

- Cannot modify platform governance.

---

# ROLE 04

## TRADER

Purpose:

Trading supervision.

Visibility:

- Trading
- Execution
- Governance

Authority:

- Trading Workflow Actions

Approvals:

- Trading Workflow Requests

Restrictions:

- Cannot modify recovery systems.
- Cannot modify platform infrastructure.

---

# ROLE 05

## PORTFOLIO MANAGER

Purpose:

Portfolio supervision.

Visibility:

- Trading
- Governance

Authority:

- Portfolio Workflow Actions

Approvals:

- Capital Allocation Workflows

Restrictions:

- Cannot modify execution infrastructure.

---

# ROLE 06

## RISK MANAGER

Purpose:

Risk governance authority.

Visibility:

- Trading
- Execution
- Governance

Authority:

- Risk Controls
- Risk Governance Actions

Approvals:

- Risk Approvals
- Risk Overrides

Restrictions:

- Cannot modify platform infrastructure.

---

# ROLE 07

## COMPLIANCE

Purpose:

Governance supervision.

Visibility:

- Operations
- Trading
- Execution
- Recovery
- Governance

Authority:

- Compliance Review

Approvals:

- Governance Review

Restrictions:

- No operational execution authority.

---

# ROLE 08

## OBSERVER

Purpose:

Read-only visibility.

Visibility:

- Authorized Domains

Authority:

- None

Approvals:

- None

Restrictions:

- No controls
- No approvals
- No governance actions

---

# GOVERNANCE CONTROL RULE

The following capabilities require governance authorization:

- Kill Switches
- Recovery Actions
- Risk Overrides
- Capital Allocation Changes
- Permission Changes
- Governance Configuration

These capabilities must never bypass authorization workflows.

---

# AUDIT REQUIREMENT

All privileged actions must generate:

- Operator Identity
- Timestamp
- Action Type
- Resource
- Result
- Audit Record

Audit generation is mandatory.

---

# FUTURE ROLE EXPANSION

Future roles may include:

- Quant Research
- Surveillance
- Regulatory Operations
- AI Governance
- Executive Oversight

Future roles must integrate without disrupting existing authority boundaries.

---

# AUTHORITATIVE PRINCIPLE

CORE TERMINAL shall provide institutional-grade visibility while maintaining strict governance over operational authority.

Visibility and control shall remain independently governed.
