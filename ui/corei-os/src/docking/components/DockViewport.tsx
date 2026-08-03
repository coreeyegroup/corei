/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 06

Component:
DockViewport

Purpose:
Institutional Dock Viewport

Responsibilities

- Final presentation viewport
- Future runtime host
- Future window composition boundary

Non Responsibilities

- Window Runtime
- Dock Runtime
- Persistence
- Focus Runtime
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import "../styles/dock-viewport.css";

export interface DockViewportProps extends PropsWithChildren {

    className?: string;

}

export function DockViewport({

    className,

    children,

}: DockViewportProps): React.JSX.Element {

    return (

        <div
            className={[
                "corei-dock-viewport",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </div>

    );

}

export default DockViewport;
