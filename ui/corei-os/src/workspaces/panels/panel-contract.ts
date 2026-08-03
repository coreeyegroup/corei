/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 05
 *
 * File        : panel-contract.ts
 * Purpose     : Panel Contract
 * =============================================================================
 */

export interface PanelContract {

    readonly id: string;

    readonly title: string;

    readonly capabilityId: string;

    readonly regionId: string;

    readonly enabled: boolean;

}
