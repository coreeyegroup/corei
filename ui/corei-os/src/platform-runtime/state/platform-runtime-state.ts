/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 03
 *
 * File        : platform-runtime-state.ts
 * Purpose     : Platform Runtime State
 * =============================================================================
 */

import type {
    PlatformRuntimeHealthStatus
} from "./platform-runtime-health-status";

export interface PlatformRuntimeState {

    readonly health:
        PlatformRuntimeHealthStatus;

}
