/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-02
 *
 * FILE:
 * RightRegion.tsx
 *
 * PURPOSE:
 * Institutional Intelligence Surface Boundary
 *
 * DESCRIPTION:
 * Defines the Phase-17 intelligence mounting boundary.
 *
 * Future intelligence and contextual capabilities attach here.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    IntelligenceRightPanel
} from "../../../intelligence/right-panel";

export function RightRegion(): ReactElement {

    return (

        <section
            className="corei-region corei-region-right"
            data-shell-surface="intelligence"
        >

            <IntelligenceRightPanel />

        </section>

    );

}

export default RightRegion;
