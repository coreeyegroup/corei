/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-05-B
 *
 * FILE:
 * RibbonWorkspace.tsx
 *
 * PURPOSE:
 * Workspace Context Surface
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import type {
    ShellWorkspaceContext
} from "../contracts/shell-header-context-contract";


export interface RibbonWorkspaceProps {

    readonly workspace: ShellWorkspaceContext;

}


export function RibbonWorkspace({
    workspace
}: RibbonWorkspaceProps): ReactElement {

    return (

        <div
            className="corei-ribbon-workspace"
            data-workspace-state={workspace.workspaceState}
        >

            {workspace.workspaceName}

        </div>

    );

}


export default RibbonWorkspace;
