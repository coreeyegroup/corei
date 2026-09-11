/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-19
 * UX-CENTER-INTEGRATION
 *
 * FILE:
 * CenterRegion.tsx
 *
 * PURPOSE:
 * Institutional Workspace Surface Boundary – now renders WorkspaceHost.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import { WorkspaceHost } from "../../../workbench/components/WorkspaceHost";

export function CenterRegion(): ReactElement {
    return (
        <section
            className="corei-region corei-region-center"
            data-shell-surface="workspace"
        >
            <WorkspaceHost />
        </section>
    );
}

export default CenterRegion;
