/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 03
 *
 * File        : engine-operational-status.ts
 * Purpose     : Engine Operational Status
 * =============================================================================
 */

export type EngineOperationalStatus =

    | "ONLINE"
    | "OFFLINE"
    | "STARTING"
    | "STOPPING"
    | "SUSPENDED"
    | "FAILED";
