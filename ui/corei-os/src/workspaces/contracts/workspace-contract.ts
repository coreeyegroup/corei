/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 01
 *
 * File        : workspace-contract.ts
 * Purpose     : Workspace Contract
 * =============================================================================
 */

export interface WorkspaceContract {

    readonly id: string;

    readonly name: string;

    readonly capabilities: readonly string[];

    readonly enabled: boolean;

}
