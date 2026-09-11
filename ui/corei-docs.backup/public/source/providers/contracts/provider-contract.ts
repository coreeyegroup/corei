/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 01
 *
 * File        : provider-contract.ts
 * Purpose     : Provider Contract
 * =============================================================================
 */

export interface ProviderContract {

    readonly id: string;

    readonly name: string;

    readonly version: string;

    readonly vendor: string;

    readonly enabled: boolean;

}
