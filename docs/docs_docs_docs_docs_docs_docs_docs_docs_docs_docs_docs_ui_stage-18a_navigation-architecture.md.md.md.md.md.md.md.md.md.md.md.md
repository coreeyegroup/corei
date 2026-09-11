# COREI Navigation Architecture

Version: 1.0

Status: FROZEN

========================================
PURPOSE
========================================

Define navigation hierarchy for all current
and future COREI terminals.

Navigation must support:

- Single Monitor
- Multi Monitor
- Multi Workspace
- Future Terminals
- Future Domains

without redesign.

========================================
NAVIGATION HIERARCHY
========================================

COREI

└── Terminal

    └── Workspace

        └── View

            └── Panel

                └── Component

========================================
LEVEL DEFINITIONS
========================================

LEVEL-01

Terminal

Examples:

- Infrastructure Terminal
- Trading Terminal
- Research Terminal
- Risk Terminal
- Compliance Terminal
- Executive Terminal

----------------------------------------

LEVEL-02

Workspace

Examples:

Infrastructure

- Operations Workspace
- Security Workspace
- Observability Workspace

Trading

- Market Workspace
- Risk Workspace
- Portfolio Workspace
- Execution Workspace

----------------------------------------

LEVEL-03

View

Examples:

Market Intelligence View
Signal Intelligence View
Decision Intelligence View

----------------------------------------

LEVEL-04

Panel

Examples:

Trend Panel
Momentum Panel
Regime Panel
Volatility Panel

----------------------------------------

LEVEL-05

Component

Examples:

Chart
Table
Grid
Audit Timeline
State Card

========================================
NAVIGATION RULES
========================================

Rule-01

Terminals are independent.

Rule-02

Workspaces belong to terminals.

Rule-03

Views belong to workspaces.

Rule-04

Panels belong to views.

Rule-05

Components belong to panels.

Rule-06

Components never own navigation.

========================================
EXPANSION RULE
========================================

Future terminals may be added without
modifying existing navigation.
