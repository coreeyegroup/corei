/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 06
 *
 * File        : lifecycle-contract.ts
 * Purpose     : Architecture Lifecycle Contract
 * =============================================================================
 */

export interface LifecycleContract {

    readonly id: string;

    readonly order: number;

    readonly description: string;

    readonly status: "ACTIVE" | "RESERVED";

}
