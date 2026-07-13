/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-07
 *
 * FILE:
 * LeftRegion.tsx
 *
 * PURPOSE:
 * Institutional Shell Left Navigation Region
 *
 * DESCRIPTION:
 * Defines the authoritative Shell integration boundary for the institutional
 * Navigation subsystem.
 *
 * The Shell owns region placement.
 * The Navigation domain owns navigation composition and behavior.
 *
 * The Navigation subsystem is consumed exclusively through its public API.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    Navigation
} from "../../../navigation";

/*=============================================================================
    COMPONENT
=============================================================================*/

export function LeftRegion(): ReactElement {

    return (

        <aside
            className="corei-shell-region corei-shell-region-left"
            data-region="left"
            data-shell-surface="navigation"
        >

            <Navigation />

        </aside>

    );

}

export default LeftRegion;
