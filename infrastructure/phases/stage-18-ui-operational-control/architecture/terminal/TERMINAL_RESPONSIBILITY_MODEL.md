# TERMINAL RESPONSIBILITY MODEL

## DOCUMENT PURPOSE

This document defines the authoritative responsibility boundaries for all CORE TERMINAL domains.

The purpose of this document is to establish clear ownership of operational supervision responsibilities.

Every capability visible inside CORE TERMINAL must belong to an authoritative domain.

Responsibility overlap should be avoided wherever possible.

---

# RESPONSIBILITY PRINCIPLE

CORE TERMINAL is domain-driven.

Each domain owns a specific operational responsibility.

Domains supervise.

Domains do not execute backend business logic.

Backend services remain authoritative execution systems.

---

# DOMAIN 01

## OPERATIONS

### MISSION

Supervise platform health and operational status.

### RESPONSIBILITIES

Operations owns visibility into:

- Platform Health
- Infrastructure Health
- Service Health
- Container Health
- Storage Health
- Network Health
- Security Health
- Observability Health
- Alert Status
- Incident Status

### PRIMARY QUESTION

Is the platform healthy?

### DOES NOT OWN

Operations does not own:

- Trading Decisions
- Portfolio Logic
- Risk Logic
- Execution Logic

---

# DOMAIN 02

## TRADING

### MISSION

Supervise business trading activity.

### RESPONSIBILITIES

Trading owns visibility into:

- Accounts
- Portfolios
- Positions
- Strategies
- PnL
- Exposure
- Trading Activity
- Capital Usage

### PRIMARY QUESTION

What is the current trading state?

### DOES NOT OWN

Trading does not own:

- Order Routing
- Broker Connectivity
- Risk Enforcement
- Recovery Operations

---

# DOMAIN 03

## EXECUTION

### MISSION

Supervise execution lifecycle activity.

### RESPONSIBILITIES

Execution owns visibility into:

- Signals
- Execution Intents
- OMS Activity
- EMS Activity
- Orders
- Fills
- Broker Status
- Execution Lineage
- Execution Latency
- Execution Quality

### PRIMARY QUESTION

How is execution behaving?

### DOES NOT OWN

Execution does not own:

- Strategy Logic
- Portfolio Logic
- Risk Logic

---

# DOMAIN 04

## RECOVERY

### MISSION

Supervise operational continuity.

### RESPONSIBILITIES

Recovery owns visibility into:

- Replay Status
- Recovery Status
- Backup Status
- Snapshot Status
- Continuity Status
- Restoration Status
- Recovery Validation
- Recovery Certification

### PRIMARY QUESTION

Can the platform recover safely?

### DOES NOT OWN

Recovery does not own:

- Trading Logic
- Portfolio Logic
- Execution Logic

Recovery supervises recovery.

Recovery does not execute recovery.

---

# DOMAIN 05

## GOVERNANCE

### MISSION

Supervise institutional controls.

### RESPONSIBILITIES

Governance owns visibility into:

- Approvals
- RBAC
- Audit Records
- Operator Actions
- Permissions
- Kill Switches
- Governance Workflows
- Compliance Events

### PRIMARY QUESTION

Is the platform operating within governance controls?

### DOES NOT OWN

Governance does not own:

- Trading Logic
- Risk Logic
- Execution Logic
- Recovery Logic

Governance supervises control systems.

Governance does not become a control system.

---

# CROSS-DOMAIN RESPONSIBILITIES

Some operational events affect multiple domains.

Examples:

Trading Event

- Trading visibility
- Execution visibility
- Governance visibility

Recovery Event

- Recovery visibility
- Operations visibility
- Governance visibility

Risk Event

- Trading visibility
- Governance visibility

Visibility may be shared.

Ownership remains singular.

---

# RESPONSIBILITY OWNERSHIP RULE

Every capability exposed inside CORE TERMINAL must have:

- One Authoritative Domain
- One Operational Owner
- One Governance Boundary

Capabilities shall not exist without ownership.

---

# AUTHORITATIVE PRINCIPLE

Operations supervises platform state.

Trading supervises business activity.

Execution supervises order lifecycle activity.

Recovery supervises continuity.

Governance supervises institutional controls.

Together these domains provide complete operational awareness without duplicating backend authority.
