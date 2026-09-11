# BUILD UNIT-004

## Title

COREI OS Foundation Layer

---

## Objective

Establish the institutional design foundation of the COREI Operating System by implementing the authoritative design token system, typography, spacing, elevation, icon registry, and foundation exports.

This Build Unit creates the single source of truth for all visual elements used throughout COREI OS.

---

## Scope

The Foundation Layer provides the core design primitives that every future module will consume.

This includes:

- Design Tokens
- Color System
- Typography
- Spacing
- Elevation
- Icon Registry
- Foundation Exports

No application component is permitted to define its own visual primitives outside this layer.

---

## Foundation Architecture

```
Foundation
        │
        ├── Raw Tokens
        │
        ├── Semantic Tokens
        │
        ├── Typography
        │
        ├── Spacing
        │
        ├── Elevation
        │
        ├── Icons
        │
        └── Theme Engine (Reserved)
```

---

## Implementation

### Foundation Structure

Created the institutional foundation module.

```
src/foundation/

colors/
typography/
spacing/
elevation/
icons/
theme/
tokens/

index.ts
```

---

### Raw Design Tokens

Implemented:

```
src/foundation/colors/raw.ts
```

Created the authoritative raw color palette.

Categories implemented:

- Black Scale
- Gray Scale
- White
- Gold
- Green
- Red
- Blue
- Orange

These tokens represent immutable design values.

---

### Semantic Design Tokens

Implemented:

```
src/foundation/colors/semantic.ts
```

Created semantic color abstraction.

Categories:

- Background
- Surface
- Border
- Text
- Accent
- Status

Application modules consume semantic tokens instead of raw colors.

---

### Typography System

Implemented:

```
src/foundation/typography/typography.ts
```

Typography tokens include:

- Primary Font
- Monospace Font
- Font Sizes
- Font Weights
- Line Heights

Typography is centralized to ensure consistency across all terminals.

---

### Spacing System

Implemented:

```
src/foundation/spacing/spacing.ts
```

Spacing tokens include:

- Standard spacing scale
- Panel padding
- Window padding
- Ribbon height
- Status bar height
- Sidebar width
- Inspector width

Spacing values are now standardized across the platform.

---

### Elevation System

Implemented:

```
src/foundation/elevation/elevation.ts
```

Elevation levels:

- Flat
- Low
- Medium
- High
- Floating

These values will be reused by windows, dialogs, panels and overlays.

---

### Icon Registry

Implemented:

```
src/foundation/icons/registry.ts
```

Established the centralized icon registry using the Lucide icon library.

Future UI modules will obtain icons exclusively through this registry.

---

### Foundation Barrel Exports

Implemented:

```
src/foundation/index.ts
```

Provides a unified export surface for:

- Colors
- Typography
- Spacing
- Elevation
- Icons

This becomes the public API of the Foundation Layer.

---

## Files Created

```
src/foundation/

colors/
    raw.ts
    semantic.ts
    index.ts

typography/
    typography.ts
    index.ts

spacing/
    spacing.ts
    index.ts

elevation/
    elevation.ts
    index.ts

icons/
    registry.ts
    index.ts

index.ts
```

---

## Reserved Modules

The following foundation modules were created but intentionally deferred.

```
src/foundation/theme/

dark.ts
light.ts
provider.ts
engine.ts
index.ts

src/foundation/tokens/
```

These will be implemented after the Theme Engine requirements are finalized.

---

## Validation

Successfully validated:

- Raw Token Compilation
- Semantic Token Compilation
- Typography Compilation
- Spacing Compilation
- Elevation Compilation
- Icon Registry Compilation
- Foundation Export Compilation

Validation Result

```
TypeScript Compilation     PASS

Vite Production Build      PASS
```

---

## Deliverables

Completed:

- Foundation Structure
- Raw Design Tokens
- Semantic Design Tokens
- Typography System
- Spacing System
- Elevation System
- Icon Registry
- Foundation Barrel Exports

---

## Repository Impact

New authoritative foundation established under:

```
src/foundation/
```

This module is now the only approved source of design primitives within COREI OS.

---

## Result

The COREI Operating System now has a centralized and deterministic design foundation.

All future modules—including the Shell Framework, Workspace Engine, Window Manager, Ribbon Framework, Navigation Framework, Visualization Engine, and hosted terminals—will consume these foundation assets instead of defining local visual values.

This establishes consistency, scalability, maintainability, and replaceability across the entire operating environment.

---

## Next Build Unit

**BU-005 – Shell Framework**

Implementation Order

- Shell Structure
- Shell Contracts
- Shell Layout
- Shell State
- Shell Provider
- Shell Components
- Validation

---

## Status

**COMPLETED**
