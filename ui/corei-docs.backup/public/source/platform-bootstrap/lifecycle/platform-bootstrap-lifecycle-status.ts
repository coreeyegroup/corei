/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 02
 *
 * File        : platform-bootstrap-lifecycle-status.ts
 * Purpose     : Platform Bootstrap Lifecycle Status
 * =============================================================================
 */

export enum PlatformBootstrapLifecycleStatus {

    CREATED = "CREATED",

    INITIALIZING = "INITIALIZING",

    VALIDATING = "VALIDATING",

    READY = "READY",

    FAILED = "FAILED"

}
