# COREI Component Architecture

Version: 1.0
Status: FROZEN

========================================
PURPOSE
========================================

Define the component taxonomy used by all
COREI terminals.

Components are reusable.

Components never own business logic.

Components never own navigation.

========================================
COMPONENT CATEGORIES
========================================

STATE COMPONENTS

- State Card
- State Summary
- State Detail
- State Timeline

----------------------------------------

GRID COMPONENTS

- Data Grid
- Position Grid
- Order Grid
- Audit Grid

----------------------------------------

CHART COMPONENTS

- Price Chart
- Trend Chart
- Exposure Chart
- PnL Chart

----------------------------------------

TIMELINE COMPONENTS

- Audit Timeline
- Deployment Timeline
- Execution Timeline

----------------------------------------

ALERT COMPONENTS

- Alert Feed
- Alert Drawer
- Alert Center

----------------------------------------

TOPOLOGY COMPONENTS

- Cluster Topology
- Service Map
- Dependency Graph

----------------------------------------

WORKSPACE COMPONENTS

- Workspace Tabs
- Workspace Switcher
- Layout Manager

----------------------------------------

NAVIGATION COMPONENTS

- Terminal Navigation
- Workspace Navigation
- View Navigation

----------------------------------------

CONTEXT COMPONENTS

- Audit Context
- Lineage Context
- AI Context

========================================
RULES
========================================

Components are presentation only.

Business logic belongs to services.

State ownership belongs to state engine.
