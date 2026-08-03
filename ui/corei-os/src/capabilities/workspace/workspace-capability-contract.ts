/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 06
 *
 * File        : workspace-capability-contract.ts
 * Purpose     : Workspace Capability Contract
 * =============================================================================
 */

export interface WorkspaceCapabilityContract {

    readonly id: string;

    readonly name: string;

    readonly enabled: boolean;

}
