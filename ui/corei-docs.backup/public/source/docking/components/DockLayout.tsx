/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 06

Component:
DockLayout

Purpose:
Institutional Dock Layout Root

Responsibilities

- Own visual dock layout root
- Parent of DockSurface
- Parent of future Dock Runtime
- Presentation layer only

Non Responsibilities

- Dock Runtime
- Dock Engine
- Layout Persistence
- Resize
- Drag Drop
------------------------------------------------------------
*/

import type {
    PropsWithChildren,
    ReactElement,
} from 'react';

export interface DockLayoutProps
    extends PropsWithChildren {
    className?: string;
}

export default function DockLayout({
    className,
    children,
}: DockLayoutProps): ReactElement {

    return (
        <div
            className={[
                "corei-dock-layout",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </div>
    );
}
