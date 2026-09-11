/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-10
 * Build Unit : 01
 * File       : monitor-contract.ts
 * Purpose    : Institutional Monitor Contract
 * =============================================================================
 */

export interface MonitorContract {

    initialize(): Promise<void>;

    attach(): Promise<void>;

    detach(): Promise<void>;

    activate(): Promise<void>;

    deactivate(): Promise<void>;

    synchronize(): Promise<void>;

}
