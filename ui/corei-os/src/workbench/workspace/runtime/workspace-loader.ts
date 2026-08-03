/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-08
 *
 * FILE
 * workspace-loader.ts
 *
 * PURPOSE
 * Load a workspace definition into Dockview.
 * ============================================================================
 */

import {

    workspaceRuntime

} from "./workspace-runtime";

import {

    panelRuntime

} from "../../panels/runtime/panel-runtime";

import {

    dockRuntime

} from "../../docking/runtime";

let loadedWorkspace:

string | null = null;

export function loadWorkspace(

    workspaceId: string

): void {

    if (loadedWorkspace === workspaceId) {
        return;
    }

    const workspace =
        workspaceRuntime.get(
            workspaceId
        );

    if (!workspace) {
        return;
    }

    loadedWorkspace = workspaceId;

    for (const panel of workspace.panels) {

        const definition =
            panelRuntime.get(
                panel.component
            );

        if (!definition) {

            console.warn(
                "[WorkspaceLoader] Panel not registered:",
                panel.component
            );

            continue;

        }

        // Open using the registered panel identifier.
        dockRuntime.openPanel(
            panel.component
        );

    }

}

export function unloadWorkspace(): void {

    loadedWorkspace = null;

}

export function currentWorkspace():

string | null {

    return loadedWorkspace;

}