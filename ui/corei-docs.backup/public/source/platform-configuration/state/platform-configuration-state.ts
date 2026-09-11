/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 03
 *
 * File        : platform-configuration-state.ts
 * Purpose     : Platform Configuration State
 * =============================================================================
 */

import type {
    PlatformConfigurationStateStatus
} from "./platform-configuration-state-status";

export interface PlatformConfigurationState {

    readonly status:
        PlatformConfigurationStateStatus;

}
