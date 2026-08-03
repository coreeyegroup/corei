/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 06.01
 *
 * File        : kernel-state.ts
 * Purpose     : Authoritative Kernel lifecycle.
 * =============================================================================
 */

export enum KernelState {

    CREATED = "CREATED",

    STARTING = "STARTING",

    RUNNING = "RUNNING",

    STOPPING = "STOPPING",

    STOPPED = "STOPPED",

    FAILED = "FAILED"

}
