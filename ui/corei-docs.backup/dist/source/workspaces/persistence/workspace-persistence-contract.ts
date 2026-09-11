/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 08
 *
 * File        : workspace-persistence-contract.ts
 * Purpose     : Workspace Persistence Contract
 * =============================================================================
 */

export interface WorkspacePersistenceContract {

    readonly workspaceId: string;

    readonly layoutId: string;

    readonly version: number;

}
