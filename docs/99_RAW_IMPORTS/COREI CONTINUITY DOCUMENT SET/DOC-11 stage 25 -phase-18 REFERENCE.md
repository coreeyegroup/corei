DOCUMENT 2 – STAGE-25 PHASE-18 REFERENCE
Capability Provider Integration
1. Overview
Attribute	Value
Phase	18
Name	Capability Provider Integration
Block	B – Platform Enablement
Purpose	Integrate the completed Capability Platform with the Provider Platform through deterministic, governed, replaceable, observable, vendor‑independent integration boundaries.
Status	✅ COMPLETE / VALIDATED / CERTIFIED / FROZEN
Backend	✅ COMPLETE (Steps 01–10)
Frontend (UX)	✅ COMPLETE (Steps 01–15, 14 panels)
2. What Phase‑18 Delivered
Backend (Integration Layer)
Capability ↔ Provider binding model – contracts, collection, registry with deterministic ordering (priority ASC, providerId lexical).

Provider resolution engine – explicit resolved/unresolved outcomes.

Provider lifecycle integration – consumes UIProviderManager.findById(), eligibility based on ACTIVE lifecycle state.

Provider runtime integration – consumes ProviderRuntime (initialized + loaded).

Provider failure/health/availability integration – deterministic precedence: failure → health unknown → unhealthy → unavailable → eligible.

Composed integration entry point – CapabilityProviderIntegration.evaluate(capabilityId).

Frontend UX (14 Operator Panels)
All panels are registered in the Workbench Panel Catalog and can be opened via the command palette or future menu.

Panel	Purpose	Location
Capability Explorer	Browse all capabilities	src/workbench/panels/library/capabilities/
Provider Explorer	Browse all providers	src/workbench/panels/library/providers/
Relationship Explorer	See capability ↔ provider mappings	src/workbench/panels/library/capability-provider-relationships/
Binding Inspector	Inspect binding details (priority, enabled)	src/workbench/panels/library/provider-binding-inspector/
Resolution Monitor	See which provider resolves for each capability	src/workbench/panels/library/resolution-monitor/
Lifecycle Monitor	View provider lifecycle states	src/workbench/panels/library/lifecycle-monitor/
Runtime Monitor	View runtime state (initialized, loaded)	src/workbench/panels/library/runtime-monitor/
Health & Availability Centre	See provider health and availability	src/workbench/panels/library/health-availability/
Diagnostics Centre	View validation diagnostics	src/workbench/panels/library/diagnostics/
Consumption Viewer	See which consumers use which capabilities	src/workbench/panels/library/consumption-viewer/
Provider Event Timeline	Chronological provider events	src/workbench/panels/library/provider-timeline/
Provider Control Surface	Runtime controls (initialize, activate, deactivate, refresh, reconnect)	src/workbench/panels/library/provider-control/
Search & Context	Global search across all domains	src/workbench/panels/library/search-context/
Integrated Institutional View	Consolidated dashboard	src/workbench/panels/library/integrated-view/
3. Backend Source Inventory – Phase‑18
All Phase‑18 backend integration lives under src/capabilities/integration/.

File	Purpose
capability-provider-binding.ts	Binding contract (capabilityId, providerId, priority, enabled)
capability-provider-bindings.ts	Type: readonly CapabilityProviderBinding[]
capability-provider-binding-registry.ts	Registry – register, getAll, findByCapabilityId, findByProviderId, find
capability-provider-resolution.ts	Result model – ResolvedCapabilityProvider / UnresolvedCapabilityProvider
capability-provider-resolver.ts	Resolver – consumes registry, selects first enabled binding
capability-provider-lifecycle-result.ts	Lifecycle integration outcomes
capability-provider-lifecycle-integration.ts	Integrates resolution with UIProviderManager, uses ACTIVE eligibility
capability-provider-runtime-result.ts	Runtime integration outcomes
capability-provider-runtime-integration.ts	Integrates lifecycle result with ProviderRuntime (initialized + loaded)
capability-provider-operational-observation.ts	Operational observation contract (failed, health, available)
capability-provider-operational-result.ts	Operational outcomes: provider_failed, health_unknown, unhealthy, unavailable, operational_eligible
capability-provider-operational-integration.ts	Evaluates operational observation with deterministic precedence
capability-provider-runtime-resolver.ts	Resolver contract for runtime observation
capability-provider-operational-observation-resolver.ts	Resolver contract for operational observation
capability-provider-integration-result.ts	Final composition outcomes (adds runtime_unobserved, operational_unobserved)
capability-provider-integration.ts	Composed entry point – orchestrates the full pipeline
index.ts	Public API entry point (exports all)
4. Frontend UX Source Inventory – Phase‑18
All Phase‑18 UX panels live under src/workbench/panels/library/ (each folder is a self‑contained panel library).

Common Structure (Each Panel)
File	Purpose
services/<panel>-adapter.ts	Adapter that consumes backend APIs and returns view models
hooks/use<Panel>.ts	React hook for state, search, selection
components/	React components (Panel, Toolbar, Search, List, Details, StatusBadge, EmptyState)
index.ts	Public exports
Panel Registration
All panels are registered in src/workbench/panels/catalog/panel-catalog.ts.

typescript
// Example entry
{
  id: "capabilities",
  title: "Capability Explorer",
  component: CapabilityExplorerPanel,
  category: "system",
  defaultLocation: "left",
  singleton: true,
  closable: true,
  persistence: true,
  minimumWidth: 340,
  minimumHeight: 320,
  permissions: ["workspace.read"],
  workspaceVisibility: ["trading", "infrastructure"],
  icon: "capability"
}
5. Key Backend Flows
Full Integration Pipeline
text
Capability ID
      │
      ▼
CapabilityProviderBindingRegistry.findByCapabilityId()
      │
      ▼ (priority ASC + providerId lexical)
CapabilityProviderResolver.resolve()
      │
      ▼
CapabilityProviderLifecycleIntegration.evaluate()
      │
      ▼ (ACTIVE?)
CapabilityProviderRuntimeResolver.resolve()
      │
      ▼
CapabilityProviderRuntimeIntegration.evaluate()
      │
      ▼ (initialized + loaded?)
CapabilityProviderOperationalObservationResolver.resolve()
      │
      ▼
CapabilityProviderOperationalIntegration.evaluate()
      │
      ▼ (failed? health? available?)
Final Integration Result
Outcomes Pipeline (Causal Preservation)
text
capability_unresolved
      │
      ▼
provider_not_found
      │
      ▼
lifecycle_ineligible
      │
      ▼
provider_runtime_unobserved
      │
      ▼
runtime_ineligible
      │
      ▼
provider_operational_unobserved
      │
      ▼
provider_failed → provider_health_unknown → provider_unhealthy → provider_unavailable
      │
      ▼
operational_eligible
6. Key Contracts / Types
Type	Location	Purpose
CapabilityProviderBinding	integration/capability-provider-binding.ts	Relationship
CapabilityProviderResolution	integration/capability-provider-resolution.ts	Resolved or not
CapabilityProviderLifecycleResult	integration/capability-provider-lifecycle-result.ts	Lifecycle integration outcome
CapabilityProviderRuntimeResult	integration/capability-provider-runtime-result.ts	Runtime integration outcome
CapabilityProviderOperationalResult	integration/capability-provider-operational-result.ts	Operational integration outcome
CapabilityProviderIntegrationResult	integration/capability-provider-integration-result.ts	Final composed outcome
CapabilityProviderOperationalObservation	integration/capability-provider-operational-observation.ts	failed, health, available
7. UX Panel Adapters – What They Consume
Panel Adapter	Backend Consumed
Capability Explorer	CapabilityManager
Provider Explorer	ProviderManager
Relationship Explorer	CapabilityProviderBindingRegistry
Binding Inspector	CapabilityProviderBindingRegistry
Resolution Monitor	CapabilityProviderResolver + CapabilityProviderBindingRegistry
Lifecycle Monitor	ProviderManager + UIProviderManager
Runtime Monitor	ProviderManager + ProviderRuntime
Health & Availability	ProviderManager + HealthStatus (Foundation)
Diagnostics	CapabilityManager + ProviderManager + CapabilityProviderBindingRegistry
Consumption Viewer	CapabilityManager
Provider Timeline	ProviderManager + CapabilityProviderBindingRegistry
Provider Control	ProviderManager (with control stubs)
Search & Context	Adapter that aggregates from all above
Integrated View	Aggregates counts from all above
8. Validation Evidence
Item	Location
Backend handoff document	docs/stage-25/phase-18/PHASE-18-CAPABILITY-PROVIDER-INTEGRATION-HANDOFF.md
Panel catalog	src/workbench/panels/catalog/panel-catalog.ts
TypeScript build	pnpm exec tsc --noEmit
Production build	pnpm build
9. Known Limitations (Documented)
Limitation	Status
Per‑provider mutable lifecycle state registry	Not implemented (uses default lifecycle injection)
Per‑provider mutable runtime state registry	Not implemented (uses global ProviderRuntime injection)
Live health telemetry polling	Not implemented – observations must be externally supplied
Automatic failover / retry	Not implemented – reserved for later phases
Command palette integration for panels	Not fully wired – can be added in Phase‑19
10. Protected Boundaries – Do Not Modify
The following directories are frozen and must not be modified unless explicitly authorised by a formal architecture review:

src/shell/** (Phase‑17)

src/capabilities/** (except src/capabilities/integration/, which is Phase‑18 and also frozen)

src/providers/**

src/foundation/**

src/platform-runtime/**

src/platform-registry/**

PHASE-18 BACKEND – COMPLETE SOURCE INVENTORY
1. Integration Layer (NEW – Core Phase‑18 Work)
Location: src/capabilities/integration/

File	Purpose	Step
src/capabilities/integration/index.ts	Public API entry point – exports all integration contracts and services	03
src/capabilities/integration/capability-provider-binding.ts	Binding contract – capabilityId, providerId, priority, enabled	03
src/capabilities/integration/capability-provider-bindings.ts	Type: readonly CapabilityProviderBinding[]	03
src/capabilities/integration/capability-provider-binding-registry.ts	Registry – register, getAll, findByCapabilityId, findByProviderId, find (deterministic ordering)	03
src/capabilities/integration/capability-provider-resolution.ts	Result model – ResolvedCapabilityProvider / UnresolvedCapabilityProvider	04
src/capabilities/integration/capability-provider-resolver.ts	Resolver – consumes registry, selects first enabled binding	04
src/capabilities/integration/capability-provider-lifecycle-result.ts	Lifecycle integration outcomes (capability_unresolved, provider_not_found, lifecycle_ineligible, lifecycle_eligible)	05
src/capabilities/integration/capability-provider-lifecycle-integration.ts	Integrates resolution with UIProviderManager; uses ACTIVE lifecycle eligibility	05
src/capabilities/integration/capability-provider-runtime-result.ts	Runtime integration outcomes (adds runtime_ineligible, runtime_eligible)	06
src/capabilities/integration/capability-provider-runtime-integration.ts	Integrates lifecycle result with ProviderRuntime (initialized + loaded)	06
src/capabilities/integration/capability-provider-operational-observation.ts	Operational observation contract – failed, health (from Foundation), available	07
src/capabilities/integration/capability-provider-operational-result.ts	Operational outcomes: provider_failed, provider_health_unknown, provider_unhealthy, provider_unavailable, operational_eligible	07
src/capabilities/integration/capability-provider-operational-integration.ts	Evaluates operational observation with deterministic precedence (failure > unknown health > unhealthy > unavailable > eligible)	07
src/capabilities/integration/capability-provider-runtime-resolver.ts	Resolver contract – providerId → ProviderRuntime | undefined	08
src/capabilities/integration/capability-provider-operational-observation-resolver.ts	Resolver contract – providerId → CapabilityProviderOperationalObservation | undefined	08
src/capabilities/integration/capability-provider-integration-result.ts	Final composition outcomes – adds provider_runtime_unobserved and provider_operational_unobserved	08
src/capabilities/integration/capability-provider-integration.ts	Composed entry point – orchestrates the full pipeline	08
2. Modified Core Platform Files (Extension / Export)
These files were modified to expose or consume the new integration layer.

File	Modification	Purpose
src/capabilities/index.ts	Added export * from "./integration";	Exposes the integration public API
src/capabilities/contracts/capability-contract.ts	(Already existed – consumed)	Core capability contract
src/capabilities/models/capability-model.ts	(Already existed – consumed)	Capability model (id, name, version)
src/capabilities/manager/capability-manager.ts	(Already existed – consumed)	Manager for capabilities
src/capabilities/registry/capability-registry.ts	(Already existed – consumed)	Registry for capabilities
3. Provider Platform (Consumed, Not Modified)
Phase‑18 consumes the existing Provider Platform, but does not modify it.

Directory / File	Purpose
src/providers/contracts/provider-contract.ts	Provider contract (id, name, version, vendor, enabled)
src/providers/models/provider-model.ts	Provider model extending contract
src/providers/registry/provider-registry.ts	In‑memory registry (array)
src/providers/manager/provider-manager.ts	Manager – getAll(), findById()
src/providers/runtime/provider-runtime.ts	Runtime state – initialized, loaded
src/providers/ui/contracts/ui-provider-contract.ts	UI‑specific provider contract
src/providers/ui/models/ui-provider-model.ts	UI provider model
src/providers/ui/registry/ui-provider-registry.ts	UI provider registry (populated with Monaco, Dockview, XTerm, AG Grid, ECharts, React Flow)
src/providers/ui/manager/ui-provider-manager.ts	UI provider manager – findById()
src/providers/ui/lifecycle/ui-provider-lifecycle.ts	Lifecycle states – REGISTERED, INITIALIZED, ACTIVE, INACTIVE
src/providers/ui/runtime/ui-provider-runtime.ts	UI provider runtime
4. Foundation Health (Consumed)
File	Purpose
src/foundation/health/state/health-status.ts	Health status enum – UNKNOWN, HEALTHY, DEGRADED, UNHEALTHY (consumed by operational integration)
5. Workbench Panel System (Modified for UX Integration)
File	Modification	Purpose
src/workbench/panels/catalog/panel-catalog.ts	Added 14 new panel entries and imports	Registers all Phase‑18 UX panels
6. Phase‑18 Frontend UX Panels (New – 14 Panels)
All panels are self‑contained libraries under src/workbench/panels/library/.

Panel Directory	Purpose
capabilities/	Capability Explorer – browse all capabilities
providers/	Provider Explorer – browse all providers
capability-provider-relationships/	Relationship Explorer – see capability ↔ provider mappings
provider-binding-inspector/	Binding Inspector – inspect binding details (priority, enabled)
resolution-monitor/	Resolution Monitor – see which provider resolves for each capability
lifecycle-monitor/	Lifecycle Monitor – view provider lifecycle states
runtime-monitor/	Runtime Monitor – view runtime state (initialized, loaded)
health-availability/	Health & Availability Centre – see provider health and availability
diagnostics/	Diagnostics Centre – view validation diagnostics
consumption-viewer/	Consumption Viewer – see which consumers use which capabilities
provider-timeline/	Provider Event Timeline – chronological provider events
provider-control/	Provider Control Surface – runtime controls (initialize, activate, deactivate, refresh, reconnect)
search-context/	Search & Context – global search across all domains
integrated-view/	Integrated Institutional View – consolidated dashboard
Each panel folder contains:

index.ts – public exports

components/ – React components (Panel, Toolbar, Search, List, Details, StatusBadge, EmptyState)

hooks/ – use<Panel>.ts (state, search, selection)

services/ – <panel>-adapter.ts (consumes backend APIs, returns view models)

7. Documentation (New)
File	Purpose
docs/stage-25/phase-18/PHASE-18-CAPABILITY-PROVIDER-INTEGRATION-HANDOFF.md	Authoritative handoff document (certified, 305 lines)
8. Configuration / Validation Files (Updated for UI Testing)
File	Purpose
playwright.config.ts	(Already existed from Phase‑17 – reused for UI validation)
tests/browser/shell-viewport.spec.ts	(Already existed from Phase‑17 – reused for UI validation)
No new configuration files were added – Phase‑18 reused the existing Playwright harness.

9. Modified Root Files (Minor)
File	Modification
package.json	No change – dependencies were already present (React, TypeScript, Vite, Zustand, TanStack, etc.)
pnpm-lock.yaml	No change – no new dependencies added
vite.config.ts	No change
tsconfig.json	No change
📊 Summary – File Counts
Category	Files
Integration Layer (new)	16
Core capability files (modified)	1 (index.ts)
Provider Platform (consumed)	~10 (not counted, already existed)
Foundation Health (consumed)	1 (already existed)
Workbench Panel Catalog (modified)	1
Frontend Panels (new)	14 directories × ~5 files = ~70 files
Documentation	1
Total Phase‑18 specific files	~90 files
🔍 Where to Find Specific Information
What you need	Look here
Integration pipeline	src/capabilities/integration/capability-provider-integration.ts
Binding registry	src/capabilities/integration/capability-provider-binding-registry.ts
Resolver	src/capabilities/integration/capability-provider-resolver.ts
Lifecycle integration	src/capabilities/integration/capability-provider-lifecycle-integration.ts
Runtime integration	src/capabilities/integration/capability-provider-runtime-integration.ts
Operational integration	src/capabilities/integration/capability-provider-operational-integration.ts
Final composition result	src/capabilities/integration/capability-provider-integration-result.ts
Panel catalog registration	src/workbench/panels/catalog/panel-catalog.ts
A specific panel’s adapter	src/workbench/panels/library/<panel>/services/<panel>-adapter.ts
Handoff documentation	docs/stage-25/phase-18/PHASE-18-CAPABILITY-PROVIDER-INTEGRATION-HANDOFF.md
