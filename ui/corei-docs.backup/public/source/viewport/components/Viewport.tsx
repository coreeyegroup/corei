/**
 * =============================================================================
 * COREI Operating Environment
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 02
 * Build Unit  : 02.08A
 *
 * File        : Viewport.tsx
 * Purpose     : Institutional Viewport Surface
 * =============================================================================
 */

import type { PropsWithChildren } from "react";

import { DefaultViewportLayout } from "../layout";

export interface ViewportProperties
extends PropsWithChildren {}

export function Viewport({

    children

}: ViewportProperties): React.JSX.Element {

    return (

        <div

            id="corei-viewport"

            style={{

                width: DefaultViewportLayout.width,

                height: DefaultViewportLayout.height,

                position: "relative",

                overflow: "hidden"

            }}

        >

            {children}

        </div>

    );

}
