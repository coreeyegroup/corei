/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 02
 *
 * File        : platform-runtime-lifecycle-status.ts
 * Purpose     : Platform Runtime Lifecycle Status
 * =============================================================================
 */

export type PlatformRuntimeLifecycleStatus =

    | "CREATED"
    | "REGISTERED"
    | "INITIALIZED"
    | "STARTING"
    | "RUNNING"
    | "SUSPENDED"
    | "STOPPING"
    | "STOPPED"
    | "DESTROYED";
