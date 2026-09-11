/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-19.02
 *
 * FILE
 * workspace-serializer.ts
 *
 * PURPOSE
 * Convert runtime state into WorkspaceSnapshot.
 * ============================================================================
 */

import type {

    WorkspaceSnapshot

} from "../contracts";

import type {

    DockLayout

} from "../../../docking/contracts/dock-layout";

export interface WorkspaceSerializerInput {

    workspaceId: string;

    layout: DockLayout;

    openPanels: string[];

    activePanel?: string;

}

export function serializeWorkspace(

    input: WorkspaceSerializerInput

): WorkspaceSnapshot {

    return {

        workspaceId:

            input.workspaceId,

        layout:

            input.layout,

        openPanels:

            input.openPanels,

        activePanel:

            input.activePanel,

        version: 1,

        updatedAt:

            Date.now()

    };

}
