/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 02
 *
 * File        : engine-lifecycle-stage.ts
 * Purpose     : Engine Lifecycle Stage
 * =============================================================================
 */

export type EngineLifecycleStage =

    | "REGISTERED"
    | "INITIALIZING"
    | "INITIALIZED"
    | "STARTING"
    | "RUNNING"
    | "SUSPENDING"
    | "SUSPENDED"
    | "RESUMING"
    | "STOPPING"
    | "STOPPED"
    | "UNLOADING"
    | "UNLOADED"
    | "FAILED";

