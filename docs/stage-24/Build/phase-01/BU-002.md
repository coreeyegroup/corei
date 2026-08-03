# BUILD UNIT-002

## Title

Institutional Workspace & Package Foundation

---

## Objective

Standardize package management across the COREI repository by establishing a single workspace, single dependency graph, and authoritative package ownership.

---

## Implementation

Completed the following activities:

- Audited all Node.js packages in the repository.
- Identified workspace applications.
- Created `pnpm-workspace.yaml`.
- Verified workspace package discovery.
- Removed nested `node_modules`.
- Removed nested `package-lock.json` files.
- Removed nested `pnpm-lock.yaml` files.
- Archived the legacy `platform/frontend/trading-dashboard`.
- Removed obsolete `platform/frontend` directory.
- Confirmed `corei-os` as the only active UI application.

---

## Files / Repositories Affected

Workspace:

```
pnpm-workspace.yaml
```

Repositories:

```
ui/corei-os/

terminals/infra-terminal/

platform/backend/websocket-gateway/

archive/platform/frontend/trading-dashboard/
```

---

## Commands Executed

- Workspace audit
- Package discovery
- Workspace creation
- Dependency cleanup
- Lock file cleanup
- Legacy frontend archive
- Repository verification

---

## Validation

Verified:

- Single package manager (pnpm)
- Single workspace
- Single lock file
- Single dependency graph
- No nested package managers
- Legacy frontend removed from active repository

---

## Result

COREI now operates as a unified institutional monorepo with deterministic package management and a single active UI platform.

---

## Next Build Unit

**BU-003 – COREI OS Bootstrap**
