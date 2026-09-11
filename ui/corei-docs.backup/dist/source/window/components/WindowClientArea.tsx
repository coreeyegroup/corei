/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 07.04

Component:
WindowClientArea

Purpose:
Institutional Window Client Area
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import "../styles/window-client-area.css";

export interface WindowClientAreaProps extends PropsWithChildren {

    className?: string;

}

export function WindowClientArea({

    className,

    children,

}: WindowClientAreaProps): React.JSX.Element {

    return (

        <main
            className={[
                "corei-window-client-area",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </main>

    );

}

export default WindowClientArea;
