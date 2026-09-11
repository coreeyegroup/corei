/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 03
 *
 * File        : engine-health-status.ts
 * Purpose     : Engine Health Status
 * =============================================================================
 */

export type EngineHealthStatus =

    | "HEALTHY"
    | "DEGRADED"
    | "UNHEALTHY"
    | "UNKNOWN";
