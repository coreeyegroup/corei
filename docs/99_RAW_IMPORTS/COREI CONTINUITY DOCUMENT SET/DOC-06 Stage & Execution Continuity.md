# =============================================================================
#
# COREI OPERATING SYSTEM
#
# DOCUMENT ID
#
# DOC-06
#
# DOCUMENT NAME
#
# COREI STAGE & EXECUTION CONTINUITY
#
# VERSION
#
# 1.0
#
# STATUS
#
# LIVING DOCUMENT
#
# PURPOSE
#
# Preserve the exact execution position of COREI.
#
# This document allows any future engineer or AI to resume
# development from the exact point where execution stopped.
#
# =============================================================================



# =============================================================================
# 1. PURPOSE
# =============================================================================

DOC-06 is the operational memory of COREI.

It records

• Current Development Position

• Current Stage

• Current Step

• Current Build Unit

• Frozen Decisions

• Active Implementation

• Execution Checkpoints

• Resume Instructions

DOC-06 is updated after every engineering session.



# =============================================================================
# 2. MASTER EXECUTION MODEL
# =============================================================================

Development follows one execution path.

```
Blueprint

↓

Architecture

↓

Implementation

↓

Validation

↓

Documentation

↓

Freeze

↓

Continue
```

No implementation skips a stage.

Every stage must complete before the next begins.



# =============================================================================
# 3. CURRENT EXECUTION POSITION
# =============================================================================

Current Master Flow

Master Build Flow v2

------------------------------------------------------------

Current Stage

Stage-25

------------------------------------------------------------

Current Step

STEP-01

------------------------------------------------------------

Current Build Unit

BU-18

------------------------------------------------------------

Current Repository

ui/corei-os

------------------------------------------------------------

Current Focus

Registry Driven Layout Engine



# =============================================================================
# 4. EXECUTION CHECKPOINT
# =============================================================================

Completed

✓ Stage-01 → Stage-24

✓ Stage-25 Architecture

✓ Workbench Foundation

✓ Registry Foundation

✓ Experience Framework

✓ Dockview Foundation

------------------------------------------------------------

Active

• BU-18

------------------------------------------------------------

Pending

• Workspace Persistence

• Workspace Profiles

• Workspace Templates

• Saved Layouts

• Workspace Restore



# =============================================================================
# 5. CURRENT WORKING CONTEXT
# =============================================================================

Repository

ui/corei-os

------------------------------------------------------------

Module

Workbench

------------------------------------------------------------

Area

Layout Runtime

------------------------------------------------------------

Objective

Replace temporary layout initialization

with

Registry Driven Layout Engine.

------------------------------------------------------------

Architecture

Frozen

Implementation continues.



# =============================================================================
# 6. FROZEN DECISIONS
# =============================================================================

The following decisions are frozen.

• COREI OS Architecture

• Framework vs Experience

• Five Cognitive Surfaces

• Repository Ownership

• Registry Architecture

• Workspace Architecture

• Dockview Adoption

• Stage Execution Model

• Master Build Flow

No redesign unless institutionally approved.



# =============================================================================
# 7. CURRENT EXCEPTION
# =============================================================================

Approved Temporary Exception

Location

WorkbenchCenter.tsx

------------------------------------------------------------

Reason

Temporary manual initialize()

------------------------------------------------------------

Removal Target

BU-18

------------------------------------------------------------

Status

Approved

No additional temporary implementations
currently exist.



# =============================================================================
# 8. NEXT EXECUTION
# =============================================================================

Immediate Work

BU-18

↓

Registry Layout Engine

------------------------------------------------------------

After Completion

Workspace Persistence

↓

Workspace Profiles

↓

Workspace Templates

↓

Saved Layouts

↓

Workspace Restore

↓

STEP-02



# =============================================================================
# 9. RESUME CHECKLIST
# =============================================================================

Before writing code verify

✓ Repository

✓ Stage

✓ Step

✓ Build Unit

✓ Frozen Architecture

✓ Repository Ownership

✓ Current Exception

✓ Next Target

If all checks pass,

continue implementation.



# =============================================================================
# 10. CONTINUITY LAW
# =============================================================================

DOC-06 records

where COREI currently is.

It never explains

architecture,

technology,

or repository ownership.

Its only responsibility is

execution continuity.

Every implementation session

must update this document

before ending.

# =============================================================================
# END OF DOC-06
# =============================================================================


# Referance - 01
I would classify them like this.
1. Workspace Tools

These build the environment itself.

Workspace Manager
Window Manager
Dock Manager
Tab Manager
Split View Manager
Layout Manager
Workspace Templates
Multi Monitor Manager
Full Screen Manager
Floating Window Manager
Focus Mode
Presentation Mode
Session Manager
2. Navigation Tools

Operator navigation.

Global Navigation
Workspace Navigator
Command Palette
Quick Search
Object Search
Symbol Search
Global Filter
Breadcrumb
Favorites
Recent Items
History
Shortcuts
Launcher
3. Visualization Tools

The heart of an intelligence platform.

Dashboard
Widget
Panel
Card
Data Grid
Pivot Grid
Table
Tree
Timeline
Gantt
Heatmap
Treemap
Sankey
Graph Network
Hierarchy Viewer
Correlation Matrix
Geographic Map
Mini Charts
Sparkline
Candlestick
Footprint
DOM
Order Book
Volume Profile
Market Profile
Tick Chart
4. Intelligence Tools

These transform data into decisions.

Market Intelligence
Signal Explorer
Decision Explorer
Risk Explorer
Portfolio Explorer
Strategy Explorer
Performance Explorer
AI Assistant
Pattern Explorer
Correlation Explorer
Dependency Explorer
Event Explorer
Replay Explorer
Scenario Explorer
What-if Analysis
5. Monitoring Tools

Institutional monitoring.

Live Monitor
Health Monitor
Service Monitor
Engine Monitor
Queue Monitor
API Monitor
Workflow Monitor
Broker Monitor
Exchange Monitor
Latency Monitor
Error Monitor
Audit Monitor
Resource Monitor
6. Operational Tools

Daily operator tools.

Watchlist
Alerts
Notifications
Calendar
Notes
Bookmarks
Clipboard
Tasks
Checklist
Chat
Activity Feed
Log Viewer
7. Trading Tools

Already part of your architecture.

Order Entry
Position Manager
Portfolio Manager
Execution Monitor
Strategy Controller
Risk Limits
Exposure Monitor
Trade Blotter
Order Blotter
Execution Replay
8. Infrastructure Tools

Consume your existing infrastructure.

Kubernetes Explorer
Kafka Explorer
PostgreSQL Explorer
Redis Explorer
Vault Explorer
Keycloak Explorer
Prometheus Viewer
Grafana Integration
Loki Log Viewer
Jaeger Trace Viewer
9. Development Tools

Since COREI is also an operating system.

Repository Explorer
File Explorer
API Explorer
Schema Explorer
Event Explorer
Contract Explorer
Runtime Inspector
State Inspector
Debug Console
Terminal
Extension Manager
10. Administration Tools

Institutional governance.

User Manager
Role Manager
Permission Manager
Team Manager
Organization Manager
Tenant Manager
License Manager
Audit Manager
Compliance Manager
Security Center
11. AI Tools

Future-proof.

Prompt Studio
AI Chat
AI Copilot
Agent Manager
Agent Monitor
Model Manager
Prompt Library
Knowledge Explorer
RAG Explorer
Reasoning Viewer
12. System Tools

Operating system utilities.

Settings
Theme
Keyboard Shortcuts
Plugin Manager
Updates
Backup
Restore
Import
Export
Diagnostics

# Referance -02
Workspace & Environment Tools
Workspace Manager
Window Manager
Layout Manager
Dock Manager
Panel Manager
Tab Manager
Split View Manager
Floating Window Manager
Multi-Monitor Manager
Workspace Template Manager
Session Manager
View Manager
Perspective Manager
Focus Mode
Presentation Mode
Navigation Tools
Global Navigation
Command Palette
Universal Search
Object Explorer
Resource Explorer
Breadcrumb Navigator
Quick Switcher
Favorites
History
Bookmarks
Launcher
Shortcut Manager
Dashboard & Visualization Tools
Dashboard Builder
Widget Manager
Panel Builder
KPI Cards
Metric Cards
Data Table
Pivot Table
Tree View
Timeline
Calendar View
Gantt View
Heatmap
Treemap
Sankey Diagram
Network Graph
Dependency Graph
Geographic Map
Floor Map
Matrix View
Charting Tools
Candlestick Chart
OHLC Chart
Line Chart
Area Chart
Bar Chart
Histogram
Scatter Plot
Bubble Chart
Pie Chart
Radar Chart
Gauge
Sparkline
Tick Chart
Renko Chart
Kagi Chart
Point & Figure
Heikin Ashi
Range Bar
Footprint Chart
Volume Profile
Market Profile
DOM Ladder
Order Book
Tape Reader
Market Intelligence Tools
Market Monitor
Market Scanner
Market Screener
Market Explorer
Market Replay
Market Structure Viewer
Liquidity Viewer
Order Flow Viewer
Volume Analyzer
Volatility Analyzer
Trend Analyzer
Momentum Analyzer
Correlation Analyzer
Regime Analyzer
News Dashboard
Economic Calendar
Event Timeline
Signal & Strategy Tools
Signal Explorer
Strategy Explorer
Strategy Builder
Strategy Monitor
Strategy Comparison
Strategy Optimizer
Signal Validator
Scenario Simulator
What-if Analysis
Monte Carlo Viewer
Portfolio & Risk Tools
Portfolio Dashboard
Portfolio Explorer
Portfolio Analytics
Position Manager
Position Viewer
Exposure Analyzer
Allocation Viewer
Risk Dashboard
Risk Heatmap
VaR Analyzer
Stress Test Viewer
Drawdown Analyzer
Margin Monitor
Execution Tools
Order Entry
Order Manager
Order Blotter
Trade Blotter
Execution Dashboard
Execution Monitor
Broker Monitor
Exchange Monitor
Fill Analyzer
Slippage Analyzer
Transaction Cost Analysis
Execution Replay
Infrastructure Tools
Infrastructure Dashboard
Kubernetes Explorer
Container Explorer
Service Explorer
Cluster Monitor
Node Monitor
Kafka Explorer
Topic Explorer
Queue Monitor
Database Explorer
Storage Explorer
Network Monitor
API Gateway Monitor
Platform Runtime Tools
Workflow Explorer
Workflow Designer
Engine Monitor
State Explorer
Runtime Inspector
Contract Explorer
Event Explorer
Message Explorer
Scheduler
Job Manager
Task Manager
Dependency Viewer
Observability Tools
Metrics Dashboard
Log Viewer
Trace Viewer
Alert Center
Incident Center
Health Dashboard
Performance Monitor
Latency Analyzer
Resource Utilization
Error Analyzer
AI & Intelligence Tools
AI Assistant
AI Chat
AI Copilot
Prompt Studio
Agent Manager
Agent Monitor
Model Manager
Knowledge Explorer
RAG Explorer
Reasoning Viewer
Insight Generator
Recommendation Engine
Security & Governance Tools
User Manager
Role Manager
Permission Manager
Team Manager
Organization Manager
Tenant Manager
Security Center
Audit Center
Compliance Center
Policy Manager
Secrets Manager
Productivity Tools
Notes
Notebook
Whiteboard
Tasks
Checklist
Clipboard History
File Manager
Document Viewer
Report Builder
Export Center
Import Center
Notification Center
Administration Tools
Settings
Theme Manager
Extension Manager
Plugin Manager
License Manager
Backup Manager
Restore Manager
Diagnostics Center

# referance -03

COREI OS UI Architecture v1.0 (Frozen)
Layered Architecture
┌─────────────────────────────────────────────────────────────┐
│ EXPERIENCES                                                 │
│ Infrastructure | Trading | Risk | Research | Executive      │
└─────────────────────────────────────────────────────────────┘
                            ▲
┌─────────────────────────────────────────────────────────────┐
│ COREI ENVIRONMENTS                                          │
│ Shell | Workspace | Navigation | Ribbon | Windowing         │
└─────────────────────────────────────────────────────────────┘
                            ▲
┌─────────────────────────────────────────────────────────────┐
│ COREI FRAMEWORKS                                            │
│ Rendering | Docking | Extensions | Runtime | SDK            │
└─────────────────────────────────────────────────────────────┘
                            ▲
┌─────────────────────────────────────────────────────────────┐
│ FOUNDATION                                                  │
│ Design System | UI Primitives | Theme | Icons | Tokens      │
└─────────────────────────────────────────────────────────────┘
                            ▲
┌─────────────────────────────────────────────────────────────┐
│ THIRD-PARTY LIBRARIES                                       │
│ shadcn | Radix | Lucide | Zustand | TanStack | Monaco ...   │
└─────────────────────────────────────────────────────────────┘

Component Categories
Layout
Sidebar
Separator
ScrollArea
Resizable
Sheet
Navigation
Accordion
Collapsible
Breadcrumb
Command
Forms
Input
Select
Checkbox
Switch
Label
Overlay
Dialog
Drawer
Popover
Tooltip
Context Menu
Dropdown Menu
Feedback
Badge
Alert
Sonner
Data
Table (only if needed)
Skeleton

AG Grid remains independent.

Workspace

Dockview remains independent.

Editor

Monaco remains independent.

Terminal

xterm remains independent.

Styling Strategy

Foundation owns:

Colors

Typography

Spacing

Elevation

Motion

Icons

Component Variants

No business layer defines colors.

No business layer defines spacing.

No business layer defines typography.

State Strategy

Foundation

↓

Zustand Stores

↓

Framework Runtime

↓

Environment

↓

Experience

Theme Strategy

Foundation owns

Theme Engine

↓

Dark Theme

↓

Light Theme

↓

Brand Theme

↓

Runtime Theme

No experience owns themes.

Design Tokens

Already owned by:

src/foundation/tokens

This remains the single source of truth.

External Libraries

These remain external services.

They are not wrapped unless they need institutional behavior.

Library	Wrapper
Monaco	Yes
Dockview	Yes
xterm	Yes
AG Grid	Yes
React Flow	Yes
ECharts	Yes
shadcn	Foundation Components
Radix	Foundation Components
Engineering Rules (Frozen)
Rule-01

Never import third-party UI libraries directly into business modules.

Rule-02

Foundation is the only layer that knows about UI vendors.

Rule-03

Experiences consume COREI components, never vendor components.

Rule-04

If a vendor changes, only Foundation changes.

Rule-05

Every new UI library must be justified with a capability it adds.

Technology Composition Matrix
Technology	COREI Layer	Purpose	Status
React	Platform	UI Runtime	✅
TypeScript	Platform	Type Safety	✅
Vite	Platform	Build System	✅
Tailwind v4	Foundation	Design System	✅
shadcn/ui	Foundation	Institutional UI Components	✅
Radix UI	Foundation	Accessible Primitive Components	✅
Lucide	Foundation	Icons	✅
Zustand	Runtime	Local UI State	✅
TanStack Query	Runtime	Server State	✅
React Hook Form	Foundation	Forms	✅
Zod	Foundation	Validation	✅
Dockview	Workspace	Docking Engine	✅
Monaco	Editor	Source Editor	✅
xterm	Terminal	Interactive Terminal	✅
Sonner	Platform	Notifications	✅
Geist	Foundation	Typography	✅
Environment Ownership Matrix
Environment	Technology Owner	Status
Foundation	Tailwind, shadcn, Radix, Lucide	✅
Shell	COREI Shell Framework	✅
Workspace	Dockview Foundation	✅
Windowing	COREI Windowing Framework	✅
Docking	COREI Docking Framework + Dockview	✅
Navigation	COREI Navigation Framework	✅
Runtime	Zustand + TanStack Query	✅
Rendering	COREI Rendering Engine	✅
Extensions	COREI Extension Runtime	✅
Application	COREI Bootstrap	✅

# Referance -04

Trading Terminal
Panel	Tool
Charts	TradingView Charting Library
DOM	Your execution engine / broker DOM
Order Entry	COREI
Positions	AG Grid
Portfolio	AG Grid + ECharts
Strategy Editor	Monaco
AI	COREI
News	API
Alerts	Sonner
Infrastructure Terminal
Panel	Tool
Kubernetes	Headlamp
GitOps	ArgoCD
Metrics	Grafana
Logs	Grafana Loki
Traces	Jaeger
Kafka	AKHQ or Redpanda Console
PostgreSQL	pgAdmin
Redis	Redis Insight
Vault	Vault UI
Keycloak	Keycloak Admin
Harbor	Harbor
Docker	Portainer
Prometheus	Grafana
Research Terminal
Panel	Tool
Monaco	Monaco
Notebook	JupyterLab
Data Explorer	AG Grid
Charts	ECharts
AI	COREI
Risk Terminal
Panel	Tool
Exposure	COREI
VaR	COREI
Margin	COREI
Limits	COREI
Portfolio	AG Grid
Executive Terminal
Panel	Tool
KPIs	ECharts
P&L	COREI
Capital	COREI
Business	COREI
Compliance Terminal
Panel	Tool
Audit	COREI
Replay	COREI
Timeline	COREI
Reports	AG Grid

# Referance -05

Good. I'll show you the implementation approach I think an institutional platform should use.

Goal

When you click Infrastructure Terminal, you should not see blank React components.

You should see real Grafana, real ArgoCD, real Headlamp, real pgAdmin inside your workspace.

Phase-1
Step-1

First create a dedicated ingress namespace.

kubectl create namespace corei-ui
Step-2

Deploy NGINX dedicated for COREI UI

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

helm repo update

helm install corei-ui ingress-nginx/ingress-nginx \
-n corei-ui
Step-3

Create one gateway

https://corei.local

Everything comes through here.

https://corei.local/grafana

https://corei.local/argocd

https://corei.local/headlamp

https://corei.local/akhq

https://corei.local/pgadmin

https://corei.local/keycloak

https://corei.local/vault

https://corei.local/redis

https://corei.local/corei
Step-4

Create reverse proxy

ui/gateway/nginx.conf

Example

server {

    listen 443 ssl;

    server_name corei.local;

    location /grafana {

        proxy_pass http://grafana.monitoring.svc.cluster.local:3000/;

    }

    location /argocd {

        proxy_pass https://argocd-server.argocd.svc.cluster.local;

    }

    location /headlamp {

        proxy_pass http://headlamp.headlamp.svc.cluster.local;

    }

    location /akhq {

        proxy_pass http://akhq.kafka.svc.cluster.local;

    }

    location /pgadmin {

        proxy_pass http://pgadmin.database.svc.cluster.local;

    }

}
Step-5

Now React becomes very small.

Install

pnpm add react-frame-component

Create

src/infrastructure/panels/GrafanaPanel.tsx
export function GrafanaPanel() {

    return (

        <iframe

            src="/grafana"

            style={{

                width:"100%",

                height:"100%",

                border:0

            }}

        />

    );

}

Create

ArgoPanel.tsx
export function ArgoPanel(){

    return (

        <iframe

            src="/argocd"

            style={{

                width:"100%",

                height:"100%",

                border:0

            }}

        />

    );

}

Create

HeadlampPanel.tsx
export function HeadlampPanel(){

    return (

        <iframe

            src="/headlamp"

            style={{

                width:"100%",

                height:"100%",

                border:0

            }}

        />

    );

}
Step-6

Now Dockview

dockview.addPanel({

    id:"grafana",

    component:"grafana"

});

dockview.addPanel({

    id:"argocd",

    component:"argocd"

});

dockview.addPanel({

    id:"headlamp",

    component:"headlamp"

});

dockview.addPanel({

    id:"terminal",

    component:"terminal"

});

dockview.addPanel({

    id:"postgres",

    component:"pgadmin"

});

Result

┌─────────────────────────────────────────────────────────────┐
│ Ribbon                                                      │
├──────────┬───────────────────────────────┬──────────────────┤
│ Nav      │ Grafana                       │ Headlamp         │
│          ├───────────────────────────────┼──────────────────┤
│          │ ArgoCD                        │ Kafka            │
│          ├───────────────────────────────┼──────────────────┤
│          │ pgAdmin                       │ Vault            │
├──────────┴───────────────────────────────┴──────────────────┤
│ xterm Terminal                                             │
└─────────────────────────────────────────────────────────────┘

Trading Terminal Architecture
                    COREI Trading Terminal

 ┌──────────────────────────────────────────────────────────────┐
 │ Ribbon                                                       │
 ├──────────┬───────────────────────────────┬────────────────────┤
 │          │                               │                    │
 │ Watchlist│   TradingView Chart           │ AI Decision        │
 │ Scanner  │   (Charting Library)          │ Signal Engine      │
 │ Markets  │                               │ News / Macro       │
 ├──────────┼───────────────────────────────┼────────────────────┤
 │          │                               │                    │
 │ Strategy │ DOM / Order Book              │ Order Entry        │
 │ Explorer │ Positions                     │ Risk               │
 │          │ Portfolio                     │ Broker Status      │
 ├──────────┼───────────────────────────────┼────────────────────┤
 │          │                               │                    │
 │ Monaco   │ xterm                         │ Logs               │
 │ Editor   │ Broker Console                │ Audit              │
 └──────────┴───────────────────────────────┴────────────────────┘
Every panel
Chart

Tool

TradingView Charting Library

Not the TradingView website.

The licensed Charting Library integrated into COREI.

Order Entry

Build yourself.

This is COREI.

BUY

SELL

SL

TP

Quantity

Leverage

Account

Broker

Execution
DOM

Either

Broker DOM API

or

Build from market depth feed.
Positions

Use

AG Grid Enterprise
Portfolio

Use

AG Grid

+

ECharts
AI

COREI

Research

Monaco

Terminal

xterm

Market Scanner

COREI

Heatmap

ECharts

Risk

COREI

News

API

Unlike Infrastructure

Infrastructure:

Grafana

Headlamp

ArgoCD

Vault

Keycloak

can be integrated.

Trading:

COREI IS THE PRODUCT.

The external libraries are only building blocks.

Trading stack
TradingView Charting Library

↓

COREI Signal Engine

↓

COREI Decision Engine

↓

COREI Risk Engine

↓

COREI Portfolio Engine

↓

COREI Execution Engine

↓

Broker API

↓

Exchange

# Referance - 06

COREI Workbench Development Plan (VS Code-style, Trading-focused)
STEP-01 — Workbench Foundation

Goal: Build the operating environment.

Use:

React
Dockview
Zustand
shadcn
Tailwind

Build:

Workbench Host
Widget Registry
Layout Engine
Workspace Manager

STEP-02 — Window & Docking System

Goal: VS Code-like workspace.

Implement:

Dockview
Tabs
Split Horizontal
Split Vertical
Drag & Drop
Resize
Maximize
Close/Open Panels
Layout Persistence
STEP-03 — Shell & Navigation

Goal: VS Code navigation.

Build:

Activity Bar
Sidebar
Secondary Sidebar
Top Ribbon
Bottom Panel
Status Bar
Breadcrumb
Context Menu

Replace coding items with COREI items.

STEP-04 — Command & Search

Goal: Everything searchable.

Build:

Command Palette
Global Search
Widget Search
Tool Search
Symbol Search
Quick Open
Recent Items
Keyboard Shortcuts
STEP-05 — Widget Framework

Goal: Everything becomes a widget.

Examples:

TradingView
Order Book
DOM
Positions
Portfolio
Risk
AI
Monaco
xterm
Grafana
Headlamp
Kafka
Vault

All widgets follow one contract.

STEP-06 — Workspace & Perspectives

Goal: One workbench, multiple terminals.

Create:

Trading Workspace
Infrastructure Workspace
Research Workspace
Risk Workspace
Executive Workspace
Compliance Workspace

Save/Restore unlimited layouts.

STEP-07 — Runtime Integration

Goal: Connect real systems.

Integrate:

TradingView
Monaco
xterm
Grafana
Kubernetes
PostgreSQL
Kafka
Redis
Vault
Keycloak
Prometheus
Loki
Jaeger
Broker APIs
COREI Domains

No mockups—real integrations.

STEP-08 — Institutional Experience

Goal: Production-grade operator workstation.

Implement:

Multi-monitor support
Themes
Notifications
Window memory
User profiles
Permissions
Session restore
Hotkeys
Plugin system
Performance optimization
Workspace import/export
Audit & telemetry
Final Architecture
COREI OS
│
├── Workbench Engine
│   ├── Shell
│   ├── Navigation
│   ├── Docking
│   ├── Search
│   ├── Commands
│   ├── Widget Registry
│   ├── Workspace Manager
│   ├── Layout Persistence
│   └── Window Manager
│
└── COREI Widgets
    ├── Trading
    ├── Infrastructure
    ├── Risk
    ├── Research
    ├── Executive
    ├── Compliance
    └── AI
