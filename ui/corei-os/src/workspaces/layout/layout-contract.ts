/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 06
 *
 * File        : layout-contract.ts
 * Purpose     : Layout Contract
 * =============================================================================
 */

export interface LayoutContract {

    readonly id: string;

    readonly workspaceId: string;

    readonly panelIds: readonly string[];

    readonly enabled: boolean;

}
