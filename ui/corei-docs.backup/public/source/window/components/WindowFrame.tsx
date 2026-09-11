/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 07.03

Component:
WindowFrame

Purpose:
Institutional Window Frame
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import "../styles/window-frame.css";

export interface WindowFrameProps extends PropsWithChildren {

    className?: string;

}

export function WindowFrame({

    className,

    children,

}: WindowFrameProps): React.JSX.Element {

    return (

        <div
            className={[
                "corei-window-frame",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </div>

    );

}

export default WindowFrame;
