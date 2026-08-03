# COREI Terminal Shell Architecture

Version: 1.0
Status: FROZEN

========================================
UI HIERARCHY
========================================

Application

    ↓

Terminal Shell

    ↓

Terminal

    ↓

Workspace

    ↓

View

    ↓

Panel

    ↓

Component

========================================
SHELL REGIONS
========================================

Top Ribbon

Left Navigation

Workspace Area

Context Area

Bottom Event Strip

========================================
SHELL MODES
========================================

Standard

Focused

Operations

Desk

Wallboard

========================================
RULES
========================================

Shell owns navigation.

Shell owns theme.

Shell owns density.

Shell owns terminal switching.

Workspaces never own navigation.

Views never own navigation.
