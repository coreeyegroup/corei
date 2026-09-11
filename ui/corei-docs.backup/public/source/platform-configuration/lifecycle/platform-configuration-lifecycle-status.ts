/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 02
 *
 * File        : platform-configuration-lifecycle-status.ts
 * Purpose     : Platform Configuration Lifecycle Status
 * =============================================================================
 */

export enum PlatformConfigurationLifecycleStatus {

    CREATED = "CREATED",

    LOADING = "LOADING",

    VALIDATING = "VALIDATING",

    READY = "READY",

    FAILED = "FAILED"

}
