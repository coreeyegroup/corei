DOCUMENT 1 – STAGE-25 PHASE-17 REFERENCE
Institutional Shell
1. Overview
Attribute	Value
Phase	17
Name	Institutional Shell
Block	B – Platform Enablement
Purpose	Build the frozen browser‑visible operating environment (Shell) that hosts all future capabilities.
Status	✅ COMPLETE / CERTIFIED / FROZEN
Git Commit	671cad22ee432cdde96dccf3f75b1ef0442e71f3
Git Tag	stage25-phase17-institutional-shell-v1
2. What Phase‑17 Delivered
Full‑screen institutional workstation with six major regions: Top (Ribbon), Left (Navigation), Center (Workspace Host), Right (Intelligence), Bottom (Timeline), Status.

Shell runtime, lifecycle, manager, provider, and state architecture.

Command & keyboard interaction system (9 keyboard shortcuts, command routing).

Shell persistence (versioned preference snapshots, restoration on startup, save on disposal/visibility changes).

Observability & diagnostics integration (console → instrumentation → Foundation logging/diagnostics).

Cross‑browser & viewport validation (27/27 Playwright tests across Chromium, Firefox, WebKit).

Resilience – failure boundaries with retry and reload recovery.

3. Source File Inventory – Phase‑17
All Phase‑17 implementation lives under src/shell/.

Core Structure
Path	Purpose
src/shell/index.ts	Public API – exports all shell subsystems
src/shell/components/	React components (Shell, ShellFrame, ShellBoundary, etc.)
src/shell/layout/	Layout definitions, grid, regions, responsive styles
src/shell/runtime/	ShellRuntime, ShellKernel, connect‑shell‑kernel, default‑shell‑kernel
src/shell/lifecycle/	ShellLifecycle – state transitions
src/shell/manager/	ShellManager – orchestration
src/shell/providers/	ShellProvider – React context provider
src/shell/state/	Shell lifecycle state (shell, ready, operational)
src/shell/events/	Shell events (initializing, started, etc.)
src/shell/contracts/	ShellKernelContract, ShellLayoutContract, ShellRegionContract
src/shell/models/	Shell model, ShellDescriptor
src/shell/context/	ShellContext – React context for Shell instance
src/shell/hooks/	Custom hooks (useShell, etc.)
Commands & Keyboard (src/shell/commands/, src/shell/keyboard/)
File	Purpose
shell-command.ts	Command contract & IDs (9 commands)
shell-command-router.ts	Routes commands to interaction runtime
shell-shortcut-resolver.ts	Keyboard shortcut → command mapping
shell-keyboard-runtime.ts	Global keydown listener lifecycle
Interactions (src/shell/interactions/)
File	Purpose
shell-interaction-state.ts	Zustand store for focusedRegion, lastCommand
shell-interaction-runtime.ts	Executes toggle/focus interactions, writes to Workbench state
Persistence (src/shell/persistence/)
File	Purpose
contracts/shell-preference-snapshot.ts	Versioned snapshot contract (version 1)
storage/shell-preference-storage.ts	localStorage adapter
runtime/shell-persistence-runtime.ts	Restore on init, save on dispose/visibility changes
Instrumentation (src/shell/instrumentation/)
File	Purpose
contracts/shell-instrumentation-contract.ts	Interface: trace, debug, info, warn, error, fatal, executeDiagnostics
runtime/shell-instrumentation-runtime.ts	Adapter over Foundation LoggingManager + DiagnosticsManager
Layout Regions (src/shell/layout/regions/)
File	Purpose
TopRegion.tsx	Mounts TopRibbon from src/ribbon/
LeftRegion.tsx	Mounts Navigation from src/navigation/
CenterRegion.tsx	Mounts WorkspaceHost from src/workbench/
RightRegion.tsx	Mounts IntelligenceRightPanel from src/intelligence/right-panel/
BottomRegion.tsx	Mounts TimelineEventStream from src/timeline/
StatusRegion.tsx	Mounts OperationalStatusBar from src/status/
Layout Styles (src/shell/layout/styles/)
File	Purpose
shell-layout.css	Full‑viewport 6‑region grid, responsive breakpoints (1440px, 1180px, 900px, 760px, 620px), reduced‑motion
Key Configuration Files
File	Purpose
src/app/App.tsx	Application composition root – App → ShellBoundary → Shell
src/main.tsx	Browser entry point – mounts App via src/app/index.ts
src/shell/contracts/shell-kernel-contract.ts	The abstract kernel contract
src/shell/runtime/default-shell-kernel.ts	Temporary bootstrap adapter (placeholder for real kernel services)
4. Key Architecture Flows
Startup Flow
text
main.tsx → App → ShellBoundary → Shell
                                     ↓
                               ShellProvider
                                     ↓
                               ShellManager.initialize()
                                     ↓
                               ShellLifecycle.initialize()
                                     ↓
                               ShellRuntime.initialize()
                                     ↓
                         ShellPersistenceRuntime.restore()
                                     ↓
                         ShellKeyboardRuntime.initialize()
Keyboard Command Flow
text
Keydown → ShellKeyboardRuntime → ShellShortcutResolver → ShellCommandRouter → ShellInteractionRuntime
                                                                                      ↓
                                                                         WorkbenchStateManager
                                                                                      ↓
                                                                         Workbench State
Persistence Flow
text
Startup  : ShellPersistenceRuntime.restore() → WorkbenchStateManager.setSidebar/Right/BottomVisible()
Disposal : ShellPersistenceRuntime.save() → localStorage
On toggle: ShellInteractionRuntime → WorkbenchStateManager → ShellPersistenceRuntime.save()
5. Dependency Direction
text
Platform Kernel (Phase-01–16)
        ↓
Institutional Shell (Phase-17)
        ↓
Workbench (Phase-19+)
The Shell does not depend on Workbench internals – it consumes Workbench through the CenterRegion → WorkspaceHost boundary.

6. Where to Find Validation Evidence
Item	Location
Playwright tests	tests/browser/shell-viewport.spec.ts
Playwright config	playwright.config.ts
Test results	test-results/
Report	playwright-report/
7. Known Baseline
Item	Status
Workbench circular dependency (workspace-runtime.ts ↔ workspace-loader.ts)	Pre‑existing, not introduced by Phase‑17
Vite chunk‑size warning (>500 kB)	Non‑blocking, deferred to Phase‑30
