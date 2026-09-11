/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 07.08

Component:
WindowComposition

Purpose:
Certified Window Composition Boundary
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import { WindowPlatform } from "./WindowPlatform";

export interface WindowCompositionProps
    extends PropsWithChildren {}

export function WindowComposition({

    children,

}: WindowCompositionProps): React.JSX.Element {

    return (

        <WindowPlatform>

            {children}

        </WindowPlatform>

    );

}

export default WindowComposition;
