# COREI Terminal Family Architecture

Version: 1.0
Status: FROZEN

========================================
PURPOSE
========================================

Define the complete terminal hierarchy for COREI.

All terminals must be independent.

No terminal may directly depend on another terminal.

All shared functionality must be provided through
shared platform engines.

========================================
TERMINAL FAMILY
========================================

COREI

├── Infrastructure Terminal
├── Trading Terminal

Future

├── Research Terminal
├── Risk Terminal
├── Compliance Terminal
└── Executive Terminal

========================================
DEPENDENCY RULES
========================================

Terminal
    ↓
Shared Engines
    ↓
Platform Services

Forbidden:

Terminal
    ↓
Another Terminal

========================================
SHARED ENGINES
========================================

Design System
Workspace Engine
State Engine
WebSocket Engine
Audit Engine
Authorization Engine

========================================
EXPANSION RULE
========================================

New terminals must plug into:

- Shell
- Navigation
- Workspace Engine
- State Engine

without modifying existing terminals.

