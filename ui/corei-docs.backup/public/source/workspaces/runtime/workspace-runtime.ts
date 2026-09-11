/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 09
 *
 * File        : workspace-runtime.ts
 * Purpose     : Workspace Runtime Orchestrator
 * =============================================================================
 */

export interface WorkspaceRuntime {

    initialize(): void;

    restore(): void;

    activate(): void;

    suspend(): void;

    resume(): void;

    deactivate(): void;

    shutdown(): void;

}

export const DefaultWorkspaceRuntime: WorkspaceRuntime = {

    initialize(): void {},

    restore(): void {},

    activate(): void {},

    suspend(): void {},

    resume(): void {},

    deactivate(): void {},

    shutdown(): void {}

};
