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
 * ============================================================================
 */

import { useDockState } from "../state/dock-state";
import { DEFAULT_DOCK_LAYOUT } from "../contracts/dock-layout";
import {
    loadWorkspaceLayout,
    saveWorkspaceLayout,
    clearWorkspaceLayout
} from "../storage/layout-storage";
import { getDockviewApi } from "../../../foundation/workspace/dockview";
import { persistenceRuntime } from "../../workspace/persistence/runtime/persistence-runtime";
import { panelRuntime } from "../../panels/runtime";

class DockRuntime {
    private readonly workspace = "trading";

    initialize(): void {
        console.log('[DockRuntime] initialize() called.');
        const layout = loadWorkspaceLayout(this.workspace);
        if (layout) {
            console.log('[DockRuntime] Layout loaded:', layout);
            useDockState.getState().setLayout(layout);
        } else {
            console.log('[DockRuntime] No layout found, using default.');
        }
    }

    dispose(): void {
        console.log('[DockRuntime] dispose() called.');
    }

    resizeLeft(width: number): void {
        const state = useDockState.getState();
        const layout = { ...state.layout, leftWidth: width };
        state.setLayout(layout);
        saveWorkspaceLayout(this.workspace, layout);
        persistenceRuntime.save();
    }

    resizeRight(width: number): void {
        const state = useDockState.getState();
        const layout = { ...state.layout, rightWidth: width };
        state.setLayout(layout);
        saveWorkspaceLayout(this.workspace, layout);
        persistenceRuntime.save();
    }

    resizeBottom(height: number): void {
        const state = useDockState.getState();
        const layout = { ...state.layout, bottomHeight: height };
        state.setLayout(layout);
        saveWorkspaceLayout(this.workspace, layout);
        persistenceRuntime.save();
    }

    reset(): void {
        useDockState.getState().setLayout(DEFAULT_DOCK_LAYOUT);
        clearWorkspaceLayout(this.workspace);
        persistenceRuntime.reset();
    }

    openPanel(panelId: string): void {
        console.log('[DockRuntime] openPanel called with panelId:', panelId);

        const api = getDockviewApi();
        if (!api) {
            console.warn('[DockRuntime] Dockview API not available. Panel not opened:', panelId);
            return;
        }

        console.log('[DockRuntime] Dockview API available, resolving panel:', panelId);

        let panel;
        try {
            panel = panelRuntime.resolve(panelId);
        } catch (e) {
            console.error('[DockRuntime] Failed to resolve panel:', panelId, e);
            return;
        }

        console.log('[DockRuntime] Panel resolved:', panel);

        try {
            api.addPanel({
                id: panel.id,
                title: panel.title,
                component: panel.id,
            });
            console.log('[DockRuntime] Panel added successfully:', panelId);
        } catch (e) {
            console.error('[DockRuntime] Failed to add panel:', panelId, e);
        }
    }

    closePanel(id: string): void {
        const api = getDockviewApi();
        if (!api) return;
        const panel = api.getPanel(id);
        if (panel) {
            panel.api.close();
            console.log('[DockRuntime] Panel closed:', id);
        }
    }
}

export const dockRuntime = new DockRuntime();
