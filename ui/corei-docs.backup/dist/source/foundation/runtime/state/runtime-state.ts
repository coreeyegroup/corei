/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 05.01
 *
 * File        : runtime-state.ts
 * Purpose     : Authoritative Runtime Lifecycle.
 * =============================================================================
 */

export enum RuntimeState {

    CREATED = "CREATED",

    STARTING = "STARTING",

    RUNNING = "RUNNING",

    STOPPING = "STOPPING",

    STOPPED = "STOPPED",

    FAILED = "FAILED"

}
