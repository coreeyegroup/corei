/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 06
 *
 * File        : workspace-capability-runtime.ts
 * Purpose     : Workspace Capability Runtime
 * =============================================================================
 */

export interface WorkspaceCapabilityRuntime {

    readonly initialized: boolean;

}

export const DefaultWorkspaceCapabilityRuntime:
WorkspaceCapabilityRuntime = {

    initialized: false

};
