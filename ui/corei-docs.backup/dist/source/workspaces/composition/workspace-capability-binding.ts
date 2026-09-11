/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 04
 *
 * File        : workspace-capability-binding.ts
 * Purpose     : Workspace Capability Binding
 * =============================================================================
 */

export interface WorkspaceCapabilityBinding {

    readonly capabilityId: string;

    readonly regionId: string;

    readonly enabled: boolean;

}
