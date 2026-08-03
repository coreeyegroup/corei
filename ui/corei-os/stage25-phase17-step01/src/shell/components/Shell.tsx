/**
 * =============================================================================
 * COREI Operating Environment
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 02
 * Build Unit  : 02.08A
 *
 * File        : Shell.tsx
 * Purpose     : Institutional Shell Composition
 * =============================================================================
 */

import { Workbench } from "@/workbench";

import { Viewport } from "@/viewport";

export function Shell(): React.JSX.Element {

    return (

        <Viewport>

            <Workbench />

        </Viewport>

    );

}
