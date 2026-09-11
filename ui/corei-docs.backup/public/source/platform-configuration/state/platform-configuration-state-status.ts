/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 03
 *
 * File        : platform-configuration-state-status.ts
 * Purpose     : Platform Configuration State Status
 * =============================================================================
 */

export enum PlatformConfigurationStateStatus {

    UNKNOWN = "UNKNOWN",

    INITIALIZING = "INITIALIZING",

    ACTIVE = "ACTIVE",

    DEGRADED = "DEGRADED",

    FAILED = "FAILED"

}
