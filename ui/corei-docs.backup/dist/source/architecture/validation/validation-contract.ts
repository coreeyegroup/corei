/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 08
 *
 * File        : validation-contract.ts
 * Purpose     : Architecture Validation Contract
 * =============================================================================
 */

export interface ValidationContract {

    readonly id: string;

    readonly category: string;

    readonly command: string;

    readonly expected: string;

}
