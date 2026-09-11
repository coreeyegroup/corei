/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 03
 *
 * File        : default-platform-configuration-state.ts
 * Purpose     : Default Platform Configuration State
 * =============================================================================
 */

import {
    PlatformConfigurationStateStatus
} from "./platform-configuration-state-status";

import type {
    PlatformConfigurationState
} from "./platform-configuration-state";

export const DefaultPlatformConfigurationState:
PlatformConfigurationState = {

    status:
        PlatformConfigurationStateStatus.UNKNOWN

};
