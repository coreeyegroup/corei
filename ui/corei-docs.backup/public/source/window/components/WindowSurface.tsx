/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 07.02

Component:
WindowSurface

Purpose:
Institutional Window Visual Surface
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import "../styles/window-surface.css";

export interface WindowSurfaceProps extends PropsWithChildren {

    className?: string;

}

export function WindowSurface({

    className,

    children,

}: WindowSurfaceProps): React.JSX.Element {

    return (

        <div
            className={[
                "corei-window-surface",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </div>

    );

}

export default WindowSurface;
