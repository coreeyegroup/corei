COREI ORBIT — CURRENT IMPLEMENTED ARCHITECTURE
Repository Reconstruction Reference — v0.1

Repository

/home/coreeye/corei/ui/corei-orbit
1. System Identity

corei-orbit is the current COREI frontend/workbench repository.

The confirmed application is a React + TypeScript UI with a shell composed of:

TopRibbon
LeftSidebar
Workspace
RightSidebar
BottomPanel
StatusBar

The application also contains domain services, Zustand-style stores/hooks, trading functionality, infrastructure functionality, market functionality, and a Trading/Broker Intelligence implementation.

This is the current implementation map, not a proposed architecture.

2. Repository Structure

Confirmed repository structure:

corei-orbit/
│
├── src/
│
│   ├── app.js
│   ├── App.tsx
│   ├── main.js
│   └── main.tsx
│
│   ├── components/
│   │
│   │   ├── BottomPanel/
│   │   │   ├── BottomPanel.tsx
│   │   │   └── BottomPanel.css
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── HelmDetail.tsx
│   │   │   ├── HelmDetail.css
│   │   │   ├── KubernetesDetail.tsx
│   │   │   ├── KubernetesDetail.css
│   │   │   ├── PostgreSQLDetail.tsx
│   │   │   └── PostgreSQLDetail.css
│   │   │
│   │   ├── LeftSidebar/
│   │   │   ├── ActivityBar.tsx
│   │   │   ├── domains.ts
│   │   │   ├── fileIcons.ts
│   │   │   ├── LeftSidebar.tsx
│   │   │   ├── LeftSidebar.css
│   │   │   └── PrimaryContent.tsx
│   │   │
│   │   ├── RightSidebar/
│   │   │   ├── RightSidebar.tsx
│   │   │   ├── RightSidebar.css
│   │   │   └── StrategyParams.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── index.ts
│   │   │   ├── OperationButton.tsx
│   │   │   ├── OperationModal.tsx
│   │   │   ├── Tabs.tsx
│   │   │   └── Tabs.css
│   │   │
│   │   ├── StatusBar/
│   │   │   ├── StatusBar.tsx
│   │   │   └── StatusBar.css
│   │   │
│   │   ├── TopBar/
│   │   │   ├── TopBar.tsx
│   │   │   └── TopBar.css
│   │   │
│   │   ├── TopRibbon/
│   │   │   ├── DropdownMenu.tsx
│   │   │   ├── Row01.tsx
│   │   │   ├── Row02.tsx
│   │   │   ├── TopRibbon.tsx
│   │   │   └── TopRibbon.css
│   │   │
│   │   ├── Workspace/
│   │   │   ├── Workspace.tsx
│   │   │   ├── Workspace.css
│   │   │   └── views/
│   │   │
│   │   ├── ErrorBoundary.tsx
│   │   └── KeyboardShortcutsHelp.tsx
│   │
│   ├── config/
│   │   ├── apiConfig.ts
│   │   └── infrastructureConfigs.ts
│   │
│   ├── features/
│   │   └── trading/
│   │       └── broker-intelligence/
│   │
│   ├── hooks/
│   │   └── useTrading.ts
│   │
│   ├── services/
│   │   ├── brokerAccountService.ts
│   │   ├── brokerConnectivityService.ts
│   │   ├── brokerIntelligenceService.ts
│   │   ├── fileService.ts
│   │   ├── infrastructureService.ts
│   │   ├── loggerService.ts
│   │   ├── marketDataService.ts
│   │   ├── n8nService.ts
│   │   ├── tradeService.ts
│   │   ├── tradingService.ts
│   │   ├── uptimeService.ts
│   │   └── webhookListener.ts
│   │
│   ├── store/
│   │   ├── actions.js
│   │   ├── appStore.ts
│   │   ├── brokerAccountStore.ts
│   │   ├── brokerConnectivityStore.ts
│   │   ├── brokerIntelligenceStore.ts
│   │   ├── fileStore.ts
│   │   ├── infrastructureSelectionStore.ts
│   │   ├── infrastructureStore.ts
│   │   ├── notificationStore.ts
│   │   ├── preferencesStore.ts
│   │   ├── shellStore.ts
│   │   ├── state.js
│   │   └── uiStore.ts
│   │
│   ├── styles/
│   │   ├── font-scale.css
│   │   ├── global.css
│   │   ├── layout.css
│   │   ├── reset.css
│   │   ├── theme-dark.css
│   │   └── variables.css
│   │
│   ├── types/
│   │   ├── brokerAccount.ts
│   │   ├── brokerConnectivity.ts
│   │   ├── brokerIntelligence.ts
│   │   └── market.ts
│   │
│   └── utils/
│       └── index.js

This tree is directly confirmed from the repository inspection.

3. Actual Application Boot Chain

The confirmed production entry is:

src/main.tsx
      │
      ▼
ReactDOM.createRoot(...)
      │
      ▼
<React.StrictMode>
      │
      ├── ErrorBoundary
      │      └── <App />
      │
      ├── KeyboardShortcuts
      │
      └── Toaster

src/main.js and src/app.js exist but are currently empty.

4. main.tsx Runtime Responsibilities

main.tsx currently performs these operations:

main.tsx
│
├── imports App
├── imports ErrorBoundary
├── loads global CSS
│
├── starts webhook listener
│   └── startWebhookListener()
│
├── starts uptime timer
│   └── startUptimeTimer()
│
├── defines global KeyboardShortcuts
│
└── mounts React application

The current Ctrl+Shift+P behavior is explicitly a placeholder command-palette notification, not an implemented command palette.

That distinction should remain documented.

5. Actual App Composition

src/App.tsx is the current top-level application composition.

App
│
├── useAppStore()
│
├── URL tab initialization
│   └── ?tab=<id> → openTab(tabId)
│
├── Trade polling
│   └── startTradePolling(10000)
│
├── Market polling
│   └── startMarketPolling(2000)
│
└── Application Shell
    │
    ├── TopRibbon
    │
    ├── KeyboardShortcutsHelp
    │
    ├── main-body
    │   │
    │   ├── LeftSidebar
    │   ├── Workspace
    │   └── RightSidebar
    │
    ├── BottomPanel
    │
    └── StatusBar

There is also an implemented standalone mode:

?standalone=true
       │
       ▼
Workspace standalone={true}

In standalone mode the normal shell is bypassed.

6. Actual Shell

The confirmed shell is:

┌─────────────────────────────────────────────────────────┐
│                    TopRibbon                            │
├──────────────┬─────────────────────────────┬────────────┤
│              │                             │            │
│ LeftSidebar  │          Workspace          │ Right      │
│              │                             │ Sidebar    │
│              │                             │            │
├──────────────┴─────────────────────────────┴────────────┤
│                    BottomPanel                           │
├─────────────────────────────────────────────────────────┤
│                    StatusBar                            │
└─────────────────────────────────────────────────────────┘

This is implemented, not conceptual.

7. LeftSidebar Architecture

The actual LeftSidebar.tsx contains two major structures:

LeftSidebar
│
├── ActivityBar
│
└── LeftExplorer

The sidebar itself supports:

domain selection
explorer content
collapsible primary panel
panel width resizing
localStorage persistence of width
keyboard domain shortcuts
infrastructure item opening
domain workspace opening
section workspace opening
generic item detail opening

The default expandable width is:

280px

with runtime bounds:

minimum: 160px
maximum: 480px

Collapsed width:

40px
8. Actual ActivityBar Domains

The current ActivityBar hard-codes these domain IDs:

trading
infrastructure
risk
market
research
portfolio
corei-os
executive
compliance
ai

Additional bottom controls:

help
settings

Therefore these are currently implemented navigation identities, regardless of whether their downstream workspace is fully implemented.

That distinction is important.

9. Actual Left Explorer Behavior

LeftSidebar.tsx contains an actual LeftExplorer architecture.

The explorer is capable of:

Domain
  │
  ├── Domain title
  │
  ├── Sections
  │
  └── Items

and can open workspace tabs through useAppStore().openTab().

The actual tab IDs are generated as:

domain-<domainId>

section-<domainId>-<section>

item-<domainId>-<item>

Infrastructure details use:

infra-<sanitized-service-name>
10. PrimaryContent

There is a separate:

src/components/LeftSidebar/PrimaryContent.tsx

It currently contains:

PrimaryContent
│
├── WorkspaceContent
├── OperationsContent
├── InfrastructureContent
├── RiskContent
├── DataContent
├── AIContent
└── SettingsContent

However, several of these are explicitly implemented as placeholder content.

For example:

Operations
→ positions / P&L / exposure
→ "Order book & execution details coming soon"

Infrastructure
→ service status
→ "Detailed service metrics coming soon"

Risk
→ static/placeholder risk values
→ "Risk analytics coming soon"

Data
→ instrument/feed placeholder

AI
→ model/signal placeholder

Settings
→ configuration placeholder

Therefore a future chat must not interpret every ActivityBar domain as a completed domain implementation.

11. State Architecture — Confirmed Inventory

The repository contains these state modules:

appStore
brokerAccountStore
brokerConnectivityStore
brokerIntelligenceStore
fileStore
infrastructureSelectionStore
infrastructureStore
notificationStore
preferencesStore
shellStore
uiStore

There are also legacy JS state files:

actions.js
state.js

The exact relationships between these stores have not yet been fully inspected and therefore are deliberately marked:

[NOT YET MAPPED]
12. Service Architecture — Confirmed Inventory

Current service layer:

services/
│
├── Broker
│   ├── brokerAccountService
│   ├── brokerConnectivityService
│   └── brokerIntelligenceService
│
├── Market
│   └── marketDataService
│
├── Trading
│   ├── tradeService
│   └── tradingService
│
├── Infrastructure
│   └── infrastructureService
│
├── File
│   └── fileService
│
├── Automation
│   └── n8nService
│
├── Runtime
│   ├── uptimeService
│   └── webhookListener
│
└── Logging
    └── loggerService

This is a significant architectural fact.

COREI Orbit already has a domain-oriented service layer. Future work should consume these existing services rather than creating parallel service implementations.

13. Trading Architecture — Confirmed

Trading has at least three distinct service/state concepts:

Trading
│
├── Broker Account
│   ├── brokerAccountService
│   └── brokerAccountStore
│
├── Broker Connectivity
│   ├── brokerConnectivityService
│   └── brokerConnectivityStore
│
└── Broker Intelligence
    ├── brokerIntelligenceService
    ├── brokerIntelligenceStore
    ├── types/brokerIntelligence.ts
    └── features/trading/broker-intelligence/

This confirms that Broker Intelligence is already a first-class architectural area in Orbit.

14. Important Architectural Fact: Two Trading UI Locations

The repository currently contains both:

src/components/trading/

and:

src/features/trading/broker-intelligence/

as well as:

src/components/Workspace/views/

Therefore the exact ownership relationship among these three locations is not yet established.

A future chat must not assume:

features = active
components = legacy
Workspace/views = active

or the reverse.

That requires import/reference inspection.

15. Workspace

Confirmed location:

src/components/Workspace/
├── Workspace.tsx
├── Workspace.css
└── views/

Workspace is the central shell content area.

The actual contents of Workspace.tsx and the complete views/ hierarchy have not yet been fully reconstructed in this audit.

Therefore:

Workspace internals = [PARTIALLY MAPPED]

rather than inventing a Workspace Manager, Window Manager, routing layer, etc.

16. Configuration

Confirmed:

src/config/
├── apiConfig.ts
└── infrastructureConfigs.ts

So Orbit has a dedicated configuration layer.

Exact configuration contracts require direct inspection.

17. Styling Architecture

Global styles:

src/styles/
├── reset.css
├── variables.css
├── theme-dark.css
├── layout.css
├── global.css
└── font-scale.css

Component-level CSS exists alongside major components.

Therefore styling is currently a mixed global + component-local CSS architecture.

18. Current Architecture Map

The highest-confidence current architecture can therefore be represented as:

                         COREI ORBIT
                              │
                         main.tsx
                              │
                     React / ErrorBoundary
                              │
                            App.tsx
                              │
              ┌───────────────┼────────────────┐
              │               │                │
          Runtime          Shell          Polling
              │               │                │
      ┌───────┴──────┐        │          ┌─────┴─────┐
      │              │        │          │           │
   Webhook         Uptime     │       Trading      Market
   Listener         Timer     │       10 sec       2 sec
                              │
                    ┌─────────┴─────────┐
                    │                   │
              LeftSidebar           Workspace
                    │                   │
          ┌─────────┴───────┐           │
          │                 │           │
     ActivityBar       LeftExplorer     │
          │                 │           │
       Domains         Navigation      │
          │                 │           │
          └─────────────────┘           │
                                        │
                              Workspace/views
                                        │
                       ┌────────────────┼──────────────┐
                       │                │              │
                    Trading          Market      Infrastructure
                       │
              Broker Intelligence
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     Service         Store          Types
        │              │              │
 brokerIntelligence  broker      brokerIntelligence
 service             Intelligence
19. What Is Confirmed vs Unknown

This is important for future chats.

CONFIRMED
Repository path
React/TypeScript application
main.tsx entry
App.tsx composition
ErrorBoundary
global shortcut component
TopRibbon
LeftSidebar
ActivityBar
LeftExplorer
Workspace
RightSidebar
BottomPanel
StatusBar
standalone Workspace mode
App store
preferences store
broker account/connectivity/intelligence stores
market/trading/infrastructure services
Broker Intelligence feature directory
global/component CSS architecture
current ActivityBar domain IDs
PARTIALLY CONFIRMED
Workspace internals
Workspace view routing
tab architecture
floating-window architecture
Trading feature ownership
Broker Intelligence component ownership
service → store → component relationships
API contracts
runtime event relationships
NOT TO BE ASSUMED

Do not assume Orbit currently has:

Workspace Manager
Window Manager
Event Bus
Domain Registry
Command Registry
Central API Gateway
Central UI Runtime

unless repository inspection proves them.

Likewise, do not assume that a placeholder domain is a completed subsystem.

20. Rules for Future COREI Orbit Chats

This section should be copied into future project chats.

COREI ORBIT — SOURCE-OF-TRUTH RULES

1. Active repository:
   /home/coreeye/corei/ui/corei-orbit

2. Treat the repository as the authority for current Orbit implementation.

3. Do not invent architecture that is not demonstrated by source code.

4. Before modifying an architectural subsystem:
   inspect its current implementation and imports.

5. Reuse existing services, stores, components and runtime mechanisms.

6. Do not create duplicate:
   - services
   - stores
   - providers
   - routing systems
   - window systems
   - state authorities
   - API clients

7. Distinguish:
   CONFIRMED
   PARTIALLY CONFIRMED
   NOT FOUND
   UNKNOWN

8. A directory existing does not mean its functionality is complete.

9. A domain appearing in ActivityBar does not mean its workspace is implemented.

10. Placeholder UI must remain classified as placeholder.

11. Do not use TypeScript compilation success as proof of functional correctness.

12. For behavioral work:
   inspect component + service + store + runtime relationship.

13. For architectural changes:
   establish current ownership before changing ownership.

14. COREI Orbit is the current frontend target for Orbit work.

15. Preserve existing architecture unless the authoritative COREI
    architecture explicitly requires a change.
Current baseline

The most important correction from the previous discussion is this:

COREI Orbit is already a substantial application with an existing shell, domain navigation, workspace, service layer, state layer, infrastructure UI, trading/broker services, and market/trading runtime polling.

We should stop treating it as a blank architecture and stop designing hypothetical layers around it.

The document above is the current confirmed baseline. Future Orbit chats can use it as the starting context, while anything marked [PARTIALLY MAPPED] or [UNKNOWN] must be inspected before being treated as fact.
