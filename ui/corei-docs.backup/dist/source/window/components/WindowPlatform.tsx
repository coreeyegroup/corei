/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 07.07

Component:
WindowPlatform

Purpose:
Institutional Window Platform Entry
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import { WindowRoot } from "./WindowRoot";

export interface WindowPlatformProps
    extends PropsWithChildren {}

export function WindowPlatform({

    children,

}: WindowPlatformProps): React.JSX.Element {

    return (

        <WindowRoot>

            {children}

        </WindowRoot>

    );

}

export default WindowPlatform;
