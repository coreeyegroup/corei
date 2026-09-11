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

let loadedWorkspace: string | null = null;

export function loadWorkspace(
    workspaceId: string
): void {
    console.log('[WorkspaceLoader] loadWorkspace called with id:', workspaceId);

    if (loadedWorkspace === workspaceId) {
        console.log('[WorkspaceLoader] Workspace already loaded:', workspaceId);
        return;
    }

    const workspace = workspaceRuntime.get(workspaceId);
    if (!workspace) {
        console.warn('[WorkspaceLoader] Workspace not found:', workspaceId);
        // Fallback: open a default panel
        dockRuntime.openPanel('welcome');
        return;
    }

    console.log('[WorkspaceLoader] Workspace found:', workspace);
    loadedWorkspace = workspaceId;

    if (!workspace.panels || workspace.panels.length === 0) {
        console.warn('[WorkspaceLoader] Workspace has no panels, opening welcome panel as fallback.');
        dockRuntime.openPanel('welcome');
        return;
    }

    console.log('[WorkspaceLoader] Loading panels:', workspace.panels);

    for (const panel of workspace.panels) {
        console.log('[WorkspaceLoader] Processing panel:', panel);
        const definition = panelRuntime.get(panel.component);
        if (!definition) {
            console.warn('[WorkspaceLoader] Panel not registered:', panel.component, ' – skipping.');
            continue;
        }
        console.log('[WorkspaceLoader] Panel definition found:', definition);
        dockRuntime.openPanel(panel.component);
        console.log('[WorkspaceLoader] dockRuntime.openPanel called.');
    }

    console.log('[WorkspaceLoader] Workspace loading complete.');
}

export function unloadWorkspace(): void {
    console.log('[WorkspaceLoader] unloadWorkspace called.');
    loadedWorkspace = null;
}

export function currentWorkspace(): string | null {
    return loadedWorkspace;
}
