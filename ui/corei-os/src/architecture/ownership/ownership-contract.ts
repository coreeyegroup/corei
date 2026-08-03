/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 02
 *
 * File        : ownership-contract.ts
 * Purpose     : Repository Ownership Contract
 * =============================================================================
 */

export interface OwnershipContract {

    readonly module: string;

    readonly owner: string;

    readonly layer: string;

    readonly phase: string;

    readonly responsibility: string;

    readonly status: "ACTIVE" | "RESERVED";

}
