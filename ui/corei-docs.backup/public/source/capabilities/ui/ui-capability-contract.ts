/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 05
 *
 * File        : ui-capability-contract.ts
 * Purpose     : UI Capability Contract
 * =============================================================================
 */

export interface UICapabilityContract {

    readonly id: string;

    readonly name: string;

    readonly providerId: string;

    readonly enabled: boolean;

}
