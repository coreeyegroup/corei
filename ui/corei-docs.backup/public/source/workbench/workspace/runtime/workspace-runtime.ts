/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-08
 *
 * FILE
 * workspace-runtime.ts
 *
 * PURPOSE
 * Authoritative Workspace Lifecycle Runtime
 * ============================================================================
 */

import {
    workspaceRegistry
} from "../registry/workspace-registry";

import {
    loadWorkspace,
    unloadWorkspace,
    currentWorkspace
} from "./workspace-loader";

import type {
    WorkspaceLayout
} from "../models/workspace-layout";

class WorkspaceRuntime {

    register(
        layout: WorkspaceLayout
    ): void {
        console.log('[WorkspaceRuntime] Registering workspace:', layout.id);
        workspaceRegistry.register(layout);
    }

    get(
        id: string
    ): WorkspaceLayout | undefined {
        const result = workspaceRegistry.get(id);
        console.log('[WorkspaceRuntime] get("' + id + '") returned:', result ? 'found' : 'undefined');
        return result;
    }

    list(): WorkspaceLayout[] {
        return workspaceRegistry.list();
    }

    open(
        id: string
    ): void {
        console.log('[WorkspaceRuntime] open("' + id + '") called.');
        loadWorkspace(id);
    }

    reload(): void {
        const current = currentWorkspace();
        if (!current) {
            return;
        }
        unloadWorkspace();
        loadWorkspace(current);
    }

    close(): void {
        unloadWorkspace();
    }

    switch(
        id: string
    ): void {
        this.close();
        this.open(id);
    }

    current(): string | null {
        return currentWorkspace();
    }
}

export const workspaceRuntime = new WorkspaceRuntime();
