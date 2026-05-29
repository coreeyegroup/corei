# TERMINAL DRILLDOWN MODEL

## DOCUMENT PURPOSE

This document defines the authoritative drilldown architecture of CORE TERMINAL.

The purpose of drilldown architecture is to enable operators to move efficiently from high-level operational visibility to authoritative evidence and root cause analysis.

Drilldowns are a primary operational capability of the terminal.

---

# DRILLDOWN PRINCIPLE

Operators begin with symptoms.

Operators end with evidence.

The terminal shall support systematic movement from operational awareness to root cause understanding.

---

# AUTHORITATIVE DRILLDOWN HIERARCHY

CORE TERMINAL follows:

Overview
    ↓
Domain
    ↓
Capability
    ↓
Evidence
    ↓
Root Cause

This hierarchy governs all investigation workflows.

---

# LEVEL 01

## OVERVIEW

Purpose:

Situational awareness.

Examples:

- Platform Health
- Trading Health
- Execution Health
- Recovery Health
- Governance Health

Question:

What requires attention?

---

# LEVEL 02

## DOMAIN

Purpose:

Responsibility isolation.

Examples:

- Portfolio Domain
- Risk Domain
- OMS Domain
- Broker Domain
- Recovery Domain

Question:

Where is the issue located?

---

# LEVEL 03

## CAPABILITY

Purpose:

Functional isolation.

Examples:

- Order Lifecycle
- Position State
- Replay Status
- Audit Visibility

Question:

Which capability is affected?

---

# LEVEL 04

## EVIDENCE

Purpose:

Operational truth.

Examples:

- Signal
- Order
- Fill
- Alert
- Audit Record
- Recovery Event
- Service Event

Question:

What actually happened?

---

# LEVEL 05

## ROOT CAUSE

Purpose:

Cause identification.

Examples:

- Strategy Generated Signal
- Risk Rejected Order
- Broker Rejected Execution
- Recovery Validation Failed
- Service Dependency Failed

Question:

Why did it happen?

---

# INVESTIGATION PRINCIPLE

Every operational object must support drilldown.

Examples:

Alert
    ↓
Evidence
    ↓
Root Cause

Order
    ↓
Execution
    ↓
Broker
    ↓
Fill
    ↓
Audit

Recovery Event
    ↓
Recovery Process
    ↓
Validation
    ↓
Root Cause

---

# CONTEXT PRESERVATION

Drilldowns shall preserve:

- Workspace
- Domain
- Filters
- Time Range
- Investigation State

Operators should never lose investigation context.

---

# CROSS-DOMAIN DRILLDOWNS

Drilldowns may traverse domains.

Example:

Signal
    ↓
Strategy
    ↓
Order
    ↓
Broker
    ↓
Fill

Example:

Alert
    ↓
Service
    ↓
Dependency
    ↓
Infrastructure

The terminal shall support seamless cross-domain movement.

---

# EVIDENCE CHAIN PRINCIPLE

Operational evidence shall remain traceable.

Examples:

Signal
    ↓
Intent
    ↓
Order
    ↓
Execution
    ↓
Fill

Recovery Request
    ↓
Recovery Workflow
    ↓
Validation
    ↓
Certification

Operators must be able to reconstruct events.

---

# FUTURE EXPANSION

Future domains shall support the same drilldown architecture.

Examples:

- Research
- Compliance
- Surveillance
- AI Governance

Future expansion shall not alter the drilldown model.

---

# AUTHORITATIVE PRINCIPLE

CORE TERMINAL shall enable operators to move from operational symptoms to authoritative evidence and root cause analysis through a consistent, traceable, and context-preserving drilldown architecture.
