/**
 * =============================================================================
 * COREI Operating Environment
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 02
 * Build Unit  : 02.01
 *
 * File        : viewport-contract.ts
 * Purpose     : Institutional Viewport Contract
 * =============================================================================
 */

export interface ViewportContract {

    initialize(): Promise<void>;

    attach(): Promise<void>;

    detach(): Promise<void>;

    resize(): Promise<void>;

}
