/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 05
 *
 * File        : dependency-contract.ts
 * Purpose     : Architecture Dependency Contract
 * =============================================================================
 */

export interface DependencyContract {

    readonly source: string;

    readonly target: string;

    readonly allowed: boolean;

}
