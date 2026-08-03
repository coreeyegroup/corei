/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage-25
 * Phase-03
 * Step-01
 * Build Unit : 01.03
 *
 * Institutional Shell Contract
 * =============================================================================
 */

export interface ShellContract {

    initialize(): Promise<void>;

    start(): Promise<void>;

    suspend(): Promise<void>;

    resume(): Promise<void>;

    stop(): Promise<void>;

}
