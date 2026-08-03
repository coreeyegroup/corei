/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 03
 *
 * File        : layer-contract.ts
 * Purpose     : Platform Layer Contract
 * =============================================================================
 */

export interface LayerContract {

    readonly id: string;

    readonly name: string;

    readonly order: number;

    readonly responsibility: string;

    readonly status: "ACTIVE" | "RESERVED";

}
