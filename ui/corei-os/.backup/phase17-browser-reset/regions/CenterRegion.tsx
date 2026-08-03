/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-18
 *
 * FILE:
 * CenterRegion.tsx
 *
 * PURPOSE:
 * Institutional Center Workspace Host Integration
 *
 * DESCRIPTION:
 * Defines the authoritative integration boundary between the Institutional
 * Shell center region and the existing Workbench operating surface.
 *
 * The Shell does not consume Workbench internals, workspace runtimes,
 * workspace loaders, docking runtimes, panel implementations, or workspace
 * platform internals directly.
 *
 * The Center Region consumes only the Workbench public API and delegates
 * workspace hosting to the Workspace Host.
 *
 * AUTHORITATIVE COMPOSITION:
 *
 * ShellLayout
 *     ↓
 * CenterRegion
 *     ↓
 * Workbench Public API
 *     ↓
 * WorkspaceHost
 *     ↓
 * WorkbenchCenter
 *     ↓
 * Existing Workbench / Workspace Infrastructure
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
    WorkspaceHost
} from "../../../workbench";

/*=============================================================================
    COMPONENT
=============================================================================*/

export function CenterRegion(): ReactElement {

    return (

        <main
            className="corei-shell-region corei-shell-region-center"
            data-region="center"
            data-shell-integration="workspace-host"
        >
            <WorkspaceHost />
        </main>

    );

}

export default CenterRegion;
