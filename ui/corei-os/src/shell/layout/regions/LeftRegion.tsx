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
 * Composes the existing Activity Bar and existing Workbench Sidebar
 * into the institutional left navigation surface.
 *
 * Existing capabilities consumed:
 *
 * - ActivityBar
 * - Sidebar
 * - Explorer
 * - Existing Activity Runtime
 * - Existing Sidebar Runtime
 * - Existing Explorer Runtime
 * - Existing Sidebar State
 *
 * No new navigation provider.
 * No new runtime.
 * No new state model.
 * No navigation architecture redesign.
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
    Sidebar
} from "../../../workbench/sidebar/Sidebar";


/* ==========================================================================
 * LEFT REGION
 * ========================================================================== */

export function LeftRegion(): ReactElement {

    return (

        <section
            className="corei-region corei-region-left"
            data-shell-surface="navigation"
        >

            <div
                className="corei-left-navigation-container"
            >

                {/* =========================================================
                 * ACTIVITY BAR
                 *
                 * Existing activity navigation surface.
                 * ========================================================= */}

                <ActivityBar />


                {/* =========================================================
                 * WORKBENCH SIDEBAR
                 *
                 * Existing Sidebar → Explorer composition.
                 *
                 * Visibility is controlled by the existing Sidebar
                 * runtime/state.
                 * ========================================================= */}

                <Sidebar />

            </div>

        </section>

    );

}


export default LeftRegion;
