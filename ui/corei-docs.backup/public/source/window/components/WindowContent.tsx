/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 07.05

Component:
WindowContent

Purpose:
Institutional Window Content
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import "../styles/window-content.css";

export interface WindowContentProps extends PropsWithChildren {

    className?: string;

}

export function WindowContent({

    className,

    children,

}: WindowContentProps): React.JSX.Element {

    return (

        <section
            className={[
                "corei-window-content",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </section>

    );

}

export default WindowContent;
