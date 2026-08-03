/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-07
 *
 * FILE
 * dock-runtime.ts
 *
 * PURPOSE
 * Dock Runtime
 *
 * AUTHORITY
 * - Owns layout sizing
 * - Owns layout persistence (compatibility layer)
 * - Delegates panel rendering to Foundation Dockview
 * ============================================================================
 */

import {
    useDockState
} from "../state/dock-state";

import {
    DEFAULT_DOCK_LAYOUT
} from "../contracts/dock-layout";

import {
    loadWorkspaceLayout,
    saveWorkspaceLayout,
    clearWorkspaceLayout
} from "../storage/layout-storage";

import {
    getDockviewApi
} from "../../../foundation/workspace/dockview";

import {
    persistenceRuntime
} from "../../workspace/persistence/runtime/persistence-runtime";

import {
    panelRuntime
} from "../../panels/runtime";

class DockRuntime {

    private readonly workspace = "trading";

    initialize(): void {

        const layout =
            loadWorkspaceLayout(
                this.workspace
            );

        if (layout) {

            useDockState
                .getState()
                .setLayout(layout);

        }

    }

    dispose(): void {}

    resizeLeft(
        width: number
    ): void {

        const state =
            useDockState.getState();

        const layout = {
            ...state.layout,
            leftWidth: width
        };

        state.setLayout(layout);

        saveWorkspaceLayout(
            this.workspace,
            layout
        );

        persistenceRuntime.save();

    }

    resizeRight(
        width: number
    ): void {

        const state =
            useDockState.getState();

        const layout = {
            ...state.layout,
            rightWidth: width
        };

        state.setLayout(layout);

        saveWorkspaceLayout(
            this.workspace,
            layout
        );

        persistenceRuntime.save();

    }

    resizeBottom(
        height: number
    ): void {

        const state =
            useDockState.getState();

        const layout = {
            ...state.layout,
            bottomHeight: height
        };

        state.setLayout(layout);

        saveWorkspaceLayout(
            this.workspace,
            layout
        );

        persistenceRuntime.save();

    }

    reset(): void {

        useDockState
            .getState()
            .setLayout(
                DEFAULT_DOCK_LAYOUT
            );

        clearWorkspaceLayout(
            this.workspace
        );

        persistenceRuntime.reset();

    }

    /**
     * Opens a panel inside the Dockview workspace.
     */
    openPanel(
        panelId: string
    ): void {

        const api =
            getDockviewApi();

        if (!api) {
            return;
        }

        const panel =
            panelRuntime.resolve(
                panelId
            );

        api.addPanel({
            id: panel.id,
            title: panel.title,
            component: panel.id
        });

    }

    /**
     * Closes an existing panel.
     */
    closePanel(
        id: string
    ): void {

        const api =
            getDockviewApi();

        if (!api) {
            return;
        }

        const panel =
            api.getPanel(id);

        panel?.api.close();

    }

}

export const dockRuntime =
    new DockRuntime();
