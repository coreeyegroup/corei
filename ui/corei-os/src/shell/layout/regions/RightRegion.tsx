/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-09
 *
 * FILE:
 * RightRegion.tsx
 *
 * PURPOSE:
 * Institutional Right Intelligence Panel Shell Integration
 *
 * DESCRIPTION:
 * Defines the authoritative integration boundary between the Institutional
 * Shell right region and the existing Intelligence Right Panel subsystem.
 *
 * The Shell consumes only the Intelligence Right Panel public API.
 *
 * The Shell does not directly consume intelligence provider, runtime, engine,
 * registry, state, event, service, agent, or cognitive internals.
 *
 * AUTHORITATIVE COMPOSITION:
 *
 * ShellLayout
 *     ↓
 * RightRegion
 *     ↓
 * Intelligence Right Panel Public API
 *     ↓
 * IntelligenceRightPanel
 *     ↓
 * Existing Intelligence Foundation
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

        <aside
            className="corei-shell-region corei-shell-region-right"
            data-region="right"
            data-shell-integration="intelligence-right-panel"
        >

            <IntelligenceRightPanel />

        </aside>

    );

}

export default RightRegion;
