/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-04
 *
 * FILE:
 * LeftRegion.tsx
 *
 * PURPOSE:
 * Institutional Navigation Workspace Boundary
 *
 * DESCRIPTION:
 * Defines the Phase-17 left shell region.
 *
 * Composes:
 *
 * Activity Ribbon
 * Navigation Surface
 *
 * Activity ownership remains with Workbench Activity Platform.
 *
 * Navigation ownership remains with Navigation Platform.
 *
 * This component only composes existing capabilities into the
 * Institutional Shell boundary.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    ActivityBar
} from "../../../workbench/activity-bar/ActivityBar";

import {
    Navigation
} from "../../../navigation/components/Navigation";


export function LeftRegion(): ReactElement {

    return (

        <section

            className="corei-region corei-region-left"

            data-shell-surface="navigation"

        >

            <div
                className="corei-left-navigation-container"
            >

                <ActivityBar />

                <Navigation />

            </div>

        </section>

    );

}


export default LeftRegion;
