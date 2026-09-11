/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 03
 *
 * File        : service-status.ts
 * Purpose     : Service Status
 * =============================================================================
 */

export type ServiceStatus =
    | "INITIALIZING"
    | "STARTING"
    | "RUNNING"
    | "STOPPING"
    | "STOPPED"
    | "FAILED";
