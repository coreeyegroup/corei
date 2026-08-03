/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-17
 *
 * FILE
 * layout-runtime.ts
 *
 * PURPOSE
 * Temporary Layout Runtime
 *
 * DESCRIPTION
 * - Resolves workspace.
 * - Resolves layout.
 * - Does NOT create Dockview panels.
 * - Manual initialize() remains authoritative.
 * - Registry-driven Dockview creation will be implemented later.
 * ============================================================================
 */

import type {

    DockviewApi

} from "dockview";

import {

    workspaceRegistry,
    layoutRegistry

} from "../registries";

import {
    dockRuntime
} from "../docking/runtime";

export class LayoutRuntime {

    load(

        api: DockviewApi,

        workspaceId: string

    ): void {

        /*
         * Resolve workspace
         */

        const workspace = workspaceRegistry.get(

            workspaceId

        );

        if (!workspace) {

            console.warn(

                "[LayoutRuntime] Workspace not found:",

                workspaceId

            );

            return;

        }

        /*
         * Resolve layout
         */

        const layout = layoutRegistry.get(

            workspace.layout

        );

        if (!layout) {

            console.warn(

                "[LayoutRuntime] Layout not found:",

                workspace.layout

            );

            return;

        }

        /*
         * Registry-driven layout execution.
         * LayoutRuntime owns layout resolution.
         * DockRuntime owns panel creation.
         */

        for (const node of layout.nodes) {

            dockRuntime.openPanel(
                node.panel
            );

    }

    void api;

    }

}

export const layoutRuntime = new LayoutRuntime();
