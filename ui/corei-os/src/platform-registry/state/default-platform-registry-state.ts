/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 *
 * Step        : 03
 * File        : default-platform-registry-state.ts
 * Purpose     : Default Platform Registry State
 * =============================================================================
 */

import {
    PlatformRegistryStateStatus
} from "./platform-registry-state-status";

import type {
    PlatformRegistryState
} from "./platform-registry-state";

export const DefaultPlatformRegistryState:
PlatformRegistryState = {

    status:
        PlatformRegistryStateStatus.UNKNOWN

};
