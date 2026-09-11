/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 01
 *
 * File        : module-contract.ts
 * Purpose     : Module Contract
 * =============================================================================
 */

export interface ModuleContract {

    readonly id: string;

    readonly name: string;

    readonly version: string;

    readonly enabled: boolean;

}
