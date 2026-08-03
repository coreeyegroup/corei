/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 07
 *
 * File        : standards-contract.ts
 * Purpose     : Architecture Standards Contract
 * =============================================================================
 */

export interface StandardsContract {

    readonly id: string;

    readonly category: string;

    readonly rule: string;

    readonly severity: "INFO" | "WARNING" | "CRITICAL";

}
