/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 03
 *
 * File        : module-operational-status.ts
 * Purpose     : Module Operational Status
 * =============================================================================
 */

export type ModuleOperationalStatus =

    | "UNKNOWN"
    | "READY"
    | "NOT_READY"
    | "DEGRADED"
    | "FAILED";
