/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-06-A
 *
 * FILE:
 * CenterRegion.tsx
 *
 * PURPOSE:
 * Institutional Workspace Surface Boundary
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    WorkbenchLayout
} from "../../../workbench/layout/WorkbenchLayout";


export function CenterRegion(): ReactElement {

    return (

        <section
            className="corei-region corei-region-center"
            data-shell-surface="workspace"
        >

            <WorkbenchLayout />

        </section>

    );

}


export default CenterRegion;
