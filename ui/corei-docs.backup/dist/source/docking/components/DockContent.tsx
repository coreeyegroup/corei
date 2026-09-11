/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 06

Component:
DockContent

Purpose:
Institutional Dock Content Viewport

Responsibilities

- Visual content viewport
- Future workspace host
- Future editor/chart host

Non Responsibilities

- Window Runtime
- Dock Runtime
- Persistence
- Focus Runtime
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import "../styles/dock-content.css";

export interface DockContentProps extends PropsWithChildren {

    className?: string;

}

export function DockContent({

    className,

    children,

}: DockContentProps): React.JSX.Element {

    return (

        <div
            className={[
                "corei-dock-content",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </div>

    );

}

export default DockContent;
