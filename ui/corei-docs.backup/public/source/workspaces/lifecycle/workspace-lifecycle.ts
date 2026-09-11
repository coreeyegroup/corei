/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 02
 *
 * File        : workspace-lifecycle.ts
 * Purpose     : Workspace Lifecycle Contract
 * =============================================================================
 */

export interface WorkspaceLifecycle {

    initialize(): void;

    activate(): void;

    deactivate(): void;

    suspend(): void;

    resume(): void;

    dispose(): void;

}
