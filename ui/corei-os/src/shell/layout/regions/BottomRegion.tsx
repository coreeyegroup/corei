/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-02
 *
 * FILE:
 * BottomRegion.tsx
 *
 * PURPOSE:
 * Institutional Operations Surface Boundary
 *
 * DESCRIPTION:
 * Defines the Phase-17 bottom operational surface.
 *
 * Future events, activity and operational history attach here.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    TimelineEventStream
} from "../../../timeline";

export function BottomRegion(): ReactElement {

    return (

        <section
            className="corei-region corei-region-bottom"
            data-shell-surface="operations"
        >

            <TimelineEventStream />

        </section>

    );

}

export default BottomRegion;
