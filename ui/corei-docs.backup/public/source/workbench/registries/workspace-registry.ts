/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-14
 *
 * FILE
 * workspace-registry.ts
 *
 * PURPOSE
 * Central Workspace Registry
 * ============================================================================
 */

import type { WorkspaceDefinition } from "../workspaces/workspace-contract";

class WorkspaceRegistry {

    private readonly workspaces = new Map<string, WorkspaceDefinition>();

    register(workspace: WorkspaceDefinition): void {

        this.workspaces.set(workspace.id, workspace);

    }

    get(id: string): WorkspaceDefinition | undefined {

        return this.workspaces.get(id);

    }

    getAll(): WorkspaceDefinition[] {

        return [...this.workspaces.values()];

    }

}

export const workspaceRegistry = new WorkspaceRegistry();
