/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-007
 * File       : startup-state.ts
 * Purpose    : Startup Lifecycle State
 * =============================================================================
 */

export enum StartupState {

    CREATED = "CREATED",

    BOOTSTRAPPED = "BOOTSTRAPPED",

    RUNTIME_READY = "RUNTIME_READY",

    PLATFORM_READY = "PLATFORM_READY",

    SDK_READY = "SDK_READY",

    READY = "READY"

}
