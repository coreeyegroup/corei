# WIDGET REGISTRY MODEL

## DOCUMENT PURPOSE

This document defines the authoritative widget registry architecture for CORE TERMINAL.

The widget registry serves as the central source of truth for reusable visual and operational components used throughout the workstation.

Widgets are the fundamental building blocks of panels.

---

# REGISTRY PRINCIPLE

Widgets shall not be hardcoded into panels.

Widgets shall be registered.

Panels consume widgets from the registry.

The registry enables component reuse and long-term evolution.

---

# ARCHITECTURE HIERARCHY

CORE TERMINAL follows:

Workspace
    ↓
Panel
    ↓
Widget
    ↓
Data

Widgets are the smallest reusable workstation unit.

---

# WIDGET DEFINITION MODEL

Every widget shall possess:

- Widget Identifier
- Widget Name
- Widget Category
- Version
- Configuration Schema
- Data Contract
- Permission Contract

Widget definitions remain immutable contracts.

---

# AUTHORITATIVE WIDGET CATEGORIES

## METRIC WIDGETS

Examples:

- PnL Metric
- Exposure Metric
- Drawdown Metric
- Latency Metric

Purpose:

Display key operational metrics.

---

## STATUS WIDGETS

Examples:

- Service Status
- Broker Status
- Recovery Status
- Strategy Status

Purpose:

Display operational state.

---

## TABLE WIDGETS

Examples:

- Position Table
- Order Table
- Fill Table
- Audit Table

Purpose:

Display structured records.

---

## CHART WIDGETS

Examples:

- Equity Curve
- Exposure Chart
- Latency Trend
- Recovery Timeline

Purpose:

Display historical and trend information.

---

## TIMELINE WIDGETS

Examples:

- Incident Timeline
- Audit Timeline
- Execution Timeline

Purpose:

Display event sequences.

---

## ALERT WIDGETS

Examples:

- Active Alerts
- Critical Events
- Recovery Alerts

Purpose:

Display actionable notifications.

---

## LOG WIDGETS

Examples:

- Service Logs
- Recovery Logs
- Audit Logs

Purpose:

Display operational evidence.

---

## CONTROL WIDGETS

Examples:

- Strategy Controls
- Recovery Controls
- Kill Switch Controls

Purpose:

Enable governed actions.

---

# WIDGET REGISTRATION MODEL

All widgets register through the central registry.

Example:

Widget ID
    ↓
Metadata
    ↓
Configuration
    ↓
Permissions
    ↓
Render Contract

The registry becomes the authoritative discovery mechanism.

---

# DATA CONTRACT MODEL

Widgets consume data through defined contracts.

Examples:

Portfolio Widget
    ↓
Portfolio Contract

Order Widget
    ↓
Order Contract

Recovery Widget
    ↓
Recovery Contract

Widgets shall not directly query arbitrary backend services.

---

# CONFIGURATION MODEL

Widgets shall support configuration.

Examples:

- Filters
- Sorting
- Time Range
- Refresh Interval
- Display Preferences

Configuration remains externalized.

---

# PERMISSION MODEL

Widgets shall inherit RBAC controls.

Visibility:

Role
    ↓
Permission Check
    ↓
Widget Access

Authorization remains centralized.

---

# VERSIONING MODEL

Widgets support versioning.

Examples:

Widget v1

Widget v2

Widget v3

Version evolution shall not break panel contracts.

---

# PANEL COMPOSITION MODEL

Panels are composed of widgets.

Example:

Portfolio Panel

    ├── Portfolio Summary Widget
    ├── Exposure Widget
    ├── Allocation Widget
    ├── Holdings Widget
    └── Risk Widget

Widgets remain independently reusable.

---

# FUTURE EXPANSION

Future domains may introduce:

- Research Widgets
- Compliance Widgets
- Surveillance Widgets
- AI Governance Widgets

Expansion occurs through registration.

Architectural redesign is not required.

---

# ENGINEERING PRINCIPLE

The widget registry is the authoritative source of widget discovery, ownership, lifecycle management, configuration, permissions, and reuse throughout CORE TERMINAL.
