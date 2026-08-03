/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 03
 *
 * File        : platform-runtime-health-status.ts
 * Purpose     : Platform Runtime Health Status
 * =============================================================================
 */

export type PlatformRuntimeHealthStatus =

    | "UNKNOWN"
    | "HEALTHY"
    | "DEGRADED"
    | "WARNING"
    | "FAILED"
    | "RECOVERING";
