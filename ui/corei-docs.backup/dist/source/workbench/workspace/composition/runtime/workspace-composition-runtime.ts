/**
 * ============================================================================
 * STAGE-25
 * STEP-03
 * BUILD UNIT-26
 *
 * FILE
 * workspace-composition-runtime.ts
 *
 * PURPOSE
 * Execute Workspace Composition
 * ============================================================================
 */

import type {

    WorkspaceComposition

} from "../workspace-composition";

import {

    dockRuntime

} from "../../../docking/runtime";

class WorkspaceCompositionRuntime {

    compose(

        workspace: WorkspaceComposition

    ): void {

        for (

            const panel

            of workspace.panels

        ) {

            dockRuntime.openPanel(

                panel.panelId

            );

        }

    }

}

export const workspaceCompositionRuntime =

new WorkspaceCompositionRuntime();
