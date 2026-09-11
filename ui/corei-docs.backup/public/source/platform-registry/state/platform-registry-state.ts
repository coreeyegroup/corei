/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 03
 *
 * File        : platform-registry-state.ts
 * Purpose     : Platform Registry State
 * =============================================================================
 */

import type {
    PlatformRegistryStateStatus
} from "./platform-registry-state-status";

export interface PlatformRegistryState {

    readonly status:
        PlatformRegistryStateStatus;

}
