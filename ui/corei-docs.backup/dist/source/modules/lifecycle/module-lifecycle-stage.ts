/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 02
 *
 * File        : module-lifecycle-stage.ts
 * Purpose     : Module Lifecycle Stage
 * =============================================================================
 */

export type ModuleLifecycleStage =

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
