/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 02
 *
 * File        : ui-provider-contract.ts
 * Purpose     : UI Provider Contract
 * =============================================================================
 */

export interface UIProviderContract {

    readonly id: string;

    readonly name: string;

    readonly category: string;

    readonly version: string;

    readonly enabled: boolean;

}
