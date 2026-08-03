/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-05-D
 *
 * FILE:
 * TopRegion.tsx
 *
 * PURPOSE:
 * Institutional Top Ribbon Mount Boundary
 *
 * DESCRIPTION:
 * Mounts the Ribbon UX surface inside the shell top region.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    TopRibbon
} from "../../../ribbon/components/TopRibbon";


export function TopRegion(): ReactElement {

    return (

        <section
            className="corei-region corei-region-top"
            data-shell-surface="command"
        >

            <TopRibbon />

        </section>

    );

}


export default TopRegion;
