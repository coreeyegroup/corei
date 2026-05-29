# TERMINAL OPERATOR MODEL

## DOCUMENT PURPOSE

This document defines the authoritative operator model for CORE TERMINAL.

The purpose of this document is to establish operator categories, responsibilities, visibility boundaries, and governance authority across the CORE SYSTEM platform.

This model serves as the foundation for:

- RBAC
- Approval Governance
- Audit Governance
- Operational Governance
- Recovery Governance
- Future Compliance Governance

---

# OPERATOR PRINCIPLES

All operators shall:

- Operate through governed workflows
- Operate through audited actions
- Operate through role-based permissions
- Operate through institutional controls

No operator shall possess unrestricted authority.

All actions must remain auditable.

---

# OPERATOR CATEGORIES

Authoritative operator categories:

- Administrator
- Platform Engineer
- Operations
- Trader
- Portfolio Manager
- Risk Manager
- Compliance
- Observer

---

# ADMINISTRATOR

Purpose:

Platform governance authority.

Responsibilities:

- User management
- RBAC administration
- Governance configuration
- Security administration

Authority:

- Full governance authority

Restrictions:

- All actions remain audited

---

# PLATFORM ENGINEER

Purpose:

Platform infrastructure supervision.

Responsibilities:

- Infrastructure visibility
- Service supervision
- Recovery supervision
- Operational troubleshooting

Authority:

- Operational controls
- Recovery controls

Restrictions:

- Cannot bypass governance workflows

---

# OPERATIONS

Purpose:

Daily operational supervision.

Responsibilities:

- Platform monitoring
- Alert management
- Incident management
- Workflow supervision

Authority:

- Operational workflow controls

Restrictions:

- Cannot modify platform governance

---

# TRADER

Purpose:

Trading activity supervision.

Responsibilities:

- Position visibility
- Strategy supervision
- Trading workflow interaction

Authority:

- Trading workflow actions

Restrictions:

- Cannot modify risk governance

---

# PORTFOLIO MANAGER

Purpose:

Portfolio oversight.

Responsibilities:

- Capital allocation visibility
- Exposure supervision
- Performance visibility

Authority:

- Portfolio governance workflows

Restrictions:

- Cannot modify platform infrastructure

---

# RISK MANAGER

Purpose:

Risk governance authority.

Responsibilities:

- Risk supervision
- Drawdown supervision
- Exposure supervision
- Risk approvals

Authority:

- Risk governance workflows

Restrictions:

- Cannot modify execution infrastructure

---

# COMPLIANCE

Purpose:

Governance and audit supervision.

Responsibilities:

- Audit visibility
- Governance review
- Approval review

Authority:

- Compliance workflows

Restrictions:

- Read-only operational authority

---

# OBSERVER

Purpose:

Read-only visibility.

Responsibilities:

- Platform observation
- Reporting
- Monitoring

Authority:

- View-only access

Restrictions:

- No operational controls
- No governance controls

---

# GOVERNANCE REQUIREMENTS

All operator actions must generate:

- Operator Identity
- Timestamp
- Action Type
- Target Resource
- Result
- Audit Record

No action may bypass audit generation.

---

# AUTHORITATIVE PRINCIPLE

Visibility and authority are separate concepts.

An operator may have visibility into a domain without possessing authority to modify that domain.

All permissions shall follow least-privilege principles.
