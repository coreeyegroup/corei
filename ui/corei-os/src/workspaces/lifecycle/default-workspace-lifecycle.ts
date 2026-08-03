/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 05
 * Build Unit  : 03
 *
 * File        : default-workspace-lifecycle.ts
 * Purpose     : Default Workspace Lifecycle
 * =============================================================================
 */

import type {

    WorkspaceLifecycle

} from "./workspace-lifecycle";

import {

    workspaceRuntime

} from "../../workbench/workspace/runtime/workspace-runtime";

export const DefaultWorkspaceLifecycle: WorkspaceLifecycle = {

    initialize(): void {

        // Workspace runtime is initialized through the Workbench
        // lifecycle. No additional initialization is required.

    },

    activate(): void {

        const current =

            workspaceRuntime.current();

        if (

            current

        ) {

            workspaceRuntime.open(

                current

            );

        }

    },

    deactivate(): void {

        workspaceRuntime.close();

    },

    suspend(): void {

        workspaceRuntime.close();

    },

    resume(): void {

        const current =

            workspaceRuntime.current();

        if (

            current

        ) {

            workspaceRuntime.open(

                current

            );

        }

    },

    dispose(): void {

        workspaceRuntime.close();

    }

};