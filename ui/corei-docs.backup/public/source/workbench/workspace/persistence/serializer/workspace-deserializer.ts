/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-19.03
 *
 * FILE
 * workspace-deserializer.ts
 *
 * PURPOSE
 * Convert WorkspaceSnapshot into runtime state.
 * ============================================================================
 */

import type {

    WorkspaceSnapshot

} from "../contracts";

import type {

    DockLayout

} from "../../../docking/contracts/dock-layout";

export interface WorkspaceRuntimeState {

    workspaceId: string;

    layout: DockLayout;

    openPanels: string[];

    activePanel?: string;

}

export function deserializeWorkspace(

    snapshot: WorkspaceSnapshot

): WorkspaceRuntimeState {

    return {

        workspaceId:

            snapshot.workspaceId,

        layout:

            snapshot.layout,

        openPanels:

            snapshot.openPanels,

        activePanel:

            snapshot.activePanel

    };

}
