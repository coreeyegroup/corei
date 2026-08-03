/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-02
 *
 * FILE:
 * StatusRegion.tsx
 *
 * PURPOSE:
 * Institutional System Status Surface Boundary
 *
 * DESCRIPTION:
 * Defines the Phase-17 system awareness surface.
 *
 * Future runtime health and operational indicators attach here.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    OperationalStatusBar
} from "../../../status";

export function StatusRegion(): ReactElement {

    return (

        <section
            className="corei-region corei-region-status"
            data-shell-surface="status"
        >

            <OperationalStatusBar />

        </section>

    );

}

export default StatusRegion;
