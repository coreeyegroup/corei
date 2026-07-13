/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-12
 *
 * FILE:
 * ShellLayout.tsx
 *
 * PURPOSE:
 * Institutional Theme-Aware Responsive Shell Layout
 *
 * DESCRIPTION:
 * Defines the authoritative six-region Institutional Shell layout.
 *
 * The layout preserves the established Shell region architecture:
 *
 * - Top Region
 * - Left Region
 * - Center Region
 * - Right Region
 * - Bottom Region
 * - Status Region
 *
 * Responsive behavior changes only region presentation and layout geometry.
 *
 * Region ownership, subsystem ownership, runtime ownership and public API
 * boundaries remain unchanged.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

/*=============================================================================
    IMPORTS
=============================================================================*/

import type {
    ReactElement
} from "react";

import {

    TopRegion,

    LeftRegion,

    CenterRegion,

    RightRegion,

    BottomRegion,

    StatusRegion

} from "../regions";

/*=============================================================================
    COMPONENT
=============================================================================*/

export function ShellLayout(): ReactElement {

    return (

        <div
            className="corei-shell-layout"
            data-shell-layout="six-region"
        >

            <header
                className="shell-top"
                data-shell-layout-region="top"
            >
                <TopRegion />
            </header>

            <aside
                className="shell-left"
                data-shell-layout-region="left"
            >
                <LeftRegion />
            </aside>

            <main
                className="shell-center"
                data-shell-layout-region="center"
            >
                <CenterRegion />
            </main>

            <aside
                className="shell-right"
                data-shell-layout-region="right"
            >
                <RightRegion />
            </aside>

            <footer
                className="shell-bottom"
                data-shell-layout-region="bottom"
            >
                <BottomRegion />
            </footer>

            <section
                className="shell-status"
                data-shell-layout-region="status"
            >
                <StatusRegion />
            </section>

        </div>

    );

}

export default ShellLayout;
