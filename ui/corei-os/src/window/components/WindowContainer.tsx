/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 07

Component:
WindowContainer

Purpose:
Institutional Window Presentation Container

Responsibilities

- Window presentation boundary
- Future window host
- Future runtime integration boundary

Non Responsibilities

- Runtime
- State
- Focus
- Resize
- Drag
- Persistence
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import "../styles/window-container.css";

export interface WindowContainerProps extends PropsWithChildren {

    className?: string;

}

export function WindowContainer({

    className,

    children,

}: WindowContainerProps): React.JSX.Element {

    return (

        <section
            className={[
                "corei-window-container",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </section>

    );

}

export default WindowContainer;
