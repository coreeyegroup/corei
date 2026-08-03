/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-19.04
 *
 * FILE
 * workspace-snapshot-builder.ts
 *
 * PURPOSE
 * Compose the current runtime state into a serializer input.
 * ============================================================================
 */

import {

    useDockState

} from "../../../docking/state/dock-state";

import {

    useTabState

} from "../../../tabs/state/tab-state";

import {

    usePanelFocusState

} from "../../../panels/state/panel-focus-state";

import type {

    WorkspaceSerializerInput

} from "../serializer";

export function buildWorkspaceSnapshot():

WorkspaceSerializerInput {

    const dock =

        useDockState.getState();

    const tabs =

        useTabState.getState();

    const panels =

        usePanelFocusState.getState();

    return {

        workspaceId:

            "trading",

        layout:

            dock.layout,

        openPanels:

            tabs.tabs.map(

                tab => tab.id

            ),

        activePanel:

            panels.focusedPanel

                ?? undefined

    };

}
