/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 03
 *
 * File        : application-status.ts
 * Purpose     : Application Status
 * =============================================================================
 */

export type ApplicationStatus =
    | "INITIALIZED"
    | "LOADED"
    | "ACTIVE"
    | "SUSPENDED"
    | "UNLOADED"
    | "SHUTDOWN";
