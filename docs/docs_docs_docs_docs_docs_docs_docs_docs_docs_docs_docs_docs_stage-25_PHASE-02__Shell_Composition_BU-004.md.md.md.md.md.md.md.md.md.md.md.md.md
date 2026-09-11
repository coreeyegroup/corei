Stage-25
Phase-02
BU-004

Institutional Navigation Environment
OBJECTIVE

Deliver a production-grade institutional navigation environment.

Operator outcome:

One Navigation

↓

All Experiences

↓

All Domains

↓

All Workspaces

↓

All Terminals
ENVIRONMENT DESIGN
┌────────────────────────────────────────────────────────────────────────────┐
│ TOP RIBBON                                                                │
├──────────────┬──────────────────────────────────────────┬──────────────────┤
│              │                                          │                  │
│              │                                          │                  │
│              │                                          │                  │
│              │                                          │                  │
│ NAVIGATION   │          WORKSPACE                       │  INTELLIGENCE    │
│              │                                          │                  │
│              │                                          │                  │
│              │                                          │                  │
│              │                                          │                  │
├──────────────┴──────────────────────────────────────────┴──────────────────┤
│ TIMELINE                                                                   │
└────────────────────────────────────────────────────────────────────────────┘
Navigation Width
Collapsed

72px

Expanded

320px

Resizable

240px → 420px

Persist width.

Navigation Composition
Navigation

├── Search
├── Favorites
├── Recent
├── Workspaces
├── Experiences
│
├── Infrastructure
├── Trading
├── Research
├── Risk
├── Executive
└── Compliance
Infrastructure Example
Infrastructure

▼ Cluster

▼ Compute

▼ Network

▼ Storage

▼ Database

▼ Messaging

▼ Security

▼ Platform

▼ Observability

▼ Delivery
Trading Example
Trading

▼ Market

▼ Signals

▼ Decision

▼ Risk

▼ Portfolio

▼ Orders

▼ Execution

▼ Positions

▼ Performance
TOOL COMPOSITION
Tool	Usage
shadcn/ui	Sidebar, Collapsible, ScrollArea, Input
Radix UI	Accordion, Tooltip, Context Menu
Lucide	Icons
Zustand	Navigation State
React Router	Route Resolution
Existing Navigation Framework	Business Logic
Experience Registry	Dynamic Registration
Navigation Runtime
Experience Registry

        │

        ▼

Navigation Registry

        │

Permission Filter

        │

Workspace Filter

        │

Search Engine

        │

Favorite Engine

        │

Recent Engine

        │

Sidebar UI
Visual Design
┌───────────────────────────────┐
│ 🔍 Search                     │
├───────────────────────────────┤
│ ★ Favorites                   │
├───────────────────────────────┤
│ 🕒 Recent                     │
├───────────────────────────────┤
│ ▼ Infrastructure              │
│     Cluster                   │
│     Compute                   │
│     Network                   │
│                               │
│ ▼ Trading                     │
│     Market                    │
│     Orders                    │
│     Portfolio                 │
│                               │
│ ▼ Research                    │
│                               │
│ ▼ Risk                        │
│                               │
│ ▼ Executive                   │
│                               │
│ ▼ Compliance                  │
└───────────────────────────────┘
Operator Features

Every node supports

✓ Icon

✓ Badge

✓ Alert Count

✓ Running Tasks

✓ Health Indicator

✓ Tooltip

✓ Keyboard Shortcut

✓ Favorite

✓ Pin

✓ Permission

✓ Search
Runtime Behavior
Click

↓

Expand

↓

Lazy Load

↓

Resolve Route

↓

Mount Experience

↓

Restore Workspace
Persistence

Persist

Expanded Nodes

Favorites

Pinned Modules

Recent Pages

Sidebar Width

Collapsed State

Selected Workspace

Using existing Zustand persistence.

Implementation (Compose, Don't Build)
1. Compose shadcn Sidebar
Sidebar
SidebarGroup
SidebarMenu
SidebarInset
2. Compose Radix
Accordion
Tooltip
Context Menu
3. Compose Navigation Framework

Reuse

src/navigation

No new navigation engine.

4. Connect Experience Registry
Experience

↓

Navigation Node

↓

Route

↓

Workspace

↓

Terminal
5. Connect Router
Navigation

↓

React Router

↓

Experience

↓

Workspace
6. Connect Zustand

Persist

width
collapse
favorites
expanded
Validation
□ Sidebar renders

□ Search works

□ Accordion works

□ Collapse works

□ Resize works

□ Favorites persist

□ Navigation persists

□ Experience registry connected

□ TypeScript PASS

□ Vite PASS
Deliverable

After BU-004, the operator should no longer see a placeholder.

They should see the first production navigation environment capable of hosting all COREI terminals, domains, and workspaces.

This is the new execution model we'll continue with: each Build Unit delivers a tangible operational capability by composing the frameworks and libraries we've already selected, rather than creating additional architectural scaffolding.


Stage-25
Phase-02
BU-004
Institutional Navigation Environment
STEP-01 — First Design Freeze

Before writing code, freeze the navigation architecture.

Navigation is NOT a menu.

It is an Institutional Operational Control System.

It answers:

Where am I?

What can I operate?

What requires attention?

What is running?

What changed?

What is unhealthy?

What should I open next?
STEP-02 — Information Architecture
Navigation
│
├── Search
├── Favorites
├── Recent
├── Workspaces
│
├── Infrastructure
│      ├── Cluster
│      ├── Compute
│      ├── Network
│      ├── Storage
│      ├── Database
│      ├── Messaging
│      ├── Security
│      ├── Platform
│      ├── Observability
│      └── Delivery
│
├── Trading
│      ├── Market
│      ├── Signals
│      ├── Decision
│      ├── Risk
│      ├── Portfolio
│      ├── Orders
│      ├── Execution
│      ├── Positions
│      └── Performance
│
├── Research
├── Risk
├── Executive
└── Compliance

This is now frozen.

STEP-03 — Component Composition

We will not build a sidebar.

We compose one.

shadcn

Compose:

Sidebar
SidebarProvider
SidebarInset
SidebarRail
SidebarMenu
SidebarMenuButton
SidebarMenuItem
SidebarGroup
SidebarGroupLabel
SidebarGroupContent
ScrollArea
Input
Separator
Radix

Compose:

Accordion
Tooltip
Context Menu
Dropdown Menu
Lucide

Compose icons.

No SVGs.

No custom icons.

Zustand

Compose:

Navigation State

↓

Expanded

↓

Selected

↓

Favorites

↓

Pinned

↓

Collapsed

↓

Width
React Router

Compose:

Navigation

↓

Route

↓

Experience

↓

Workspace
STEP-04 — Navigation Runtime
Experience Registry
        │
        ▼
Navigation Registry
        │
Permission Engine
        │
Workspace Engine
        │
Search Index
        │
Favorite Engine
        │
Navigation UI
STEP-05 — UX Requirements

Navigation must support:

✓ Keyboard-first

✓ Mouse

✓ Search

✓ Collapse

✓ Resize

✓ Favorites

✓ Recent

✓ Badges

✓ Health Indicators

✓ Permission-aware visibility

✓ Workspace-aware filtering

✓ Multi-terminal awareness

✓ Instant switching

STEP-06 — Visual Layout
┌──────────────────────────────┐
│ COREI                        │
├──────────────────────────────┤
│ 🔍 Search                    │
├──────────────────────────────┤
│ ★ Favorites                  │
├──────────────────────────────┤
│ 🕒 Recent                    │
├──────────────────────────────┤
│ ▼ Infrastructure             │
│    • Cluster                 │
│    • Compute                 │
│    • Network                 │
│                              │
│ ▼ Trading                    │
│    • Market                  │
│    • Orders                  │
│    • Portfolio               │
│                              │
│ ▼ Research                   │
│ ▼ Risk                       │
│ ▼ Executive                  │
│ ▼ Compliance                 │
└──────────────────────────────┘
STEP-07 — Implementation Strategy

Now we stop designing.

The next implementation work is composition, not invention.

We will:

Install and configure the official shadcn Sidebar (if not already present).
Connect it to the existing src/navigation framework.
Register experiences dynamically from the Experience Registry.
Connect routing with React Router.
Persist navigation state with Zustand.
Style it using the COREI design system.
Validate keyboard navigation, resizing, and persistence.

No custom sidebar engine.

No placeholder navigation.

What I want to do before writing code

I want the next Build Unit to start from the actual components we have installed, not assumptions.

So the first action will be to audit the current UI stack and answer:

Which shadcn components are already installed?
Which Radix primitives are already available?
Which docking library did we finally choose?
Which charting library is installed?
Which command palette is installed?
Which sidebar implementation is available?

Then we compose from those exact assets instead of generating generic code.

I believe this is the correct institutional workflow: inventory → compose → configure → integrate → validate. It keeps the implementation aligned with the tools we've deliberately chosen and avoids rebuilding capabilities that already exist.
