/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 12
 *
 * File        : workspace-manager.ts
 * Purpose     : Workspace Manager
 * =============================================================================
 */

import type { WorkspaceModel } from "../models/workspace";
import { WorkspaceRegistry } from "../registry/workspace-registry";

export class WorkspaceManager {

    private activeWorkspaceId?: string;

    public register(
        workspace: WorkspaceModel
    ): void {

        (WorkspaceRegistry as WorkspaceModel[]).push(
            workspace
        );

        if (
            this.activeWorkspaceId === undefined
        ) {

            this.activeWorkspaceId =
                workspace.id;

        }

    }

    public getAll(): readonly WorkspaceModel[] {

        return WorkspaceRegistry;

    }

    public setActive(
        workspaceId: string
    ): void {

        const exists =
            WorkspaceRegistry.some(
                workspace =>
                    workspace.id === workspaceId
            );

        if (!exists) {

            throw new Error(
                `Unknown workspace: ${workspaceId}`
            );

        }

        this.activeWorkspaceId =
            workspaceId;

    }

    public getActive():
        | WorkspaceModel
        | undefined {

        return WorkspaceRegistry.find(
            workspace =>
                workspace.id ===
                this.activeWorkspaceId
        );

    }

}
