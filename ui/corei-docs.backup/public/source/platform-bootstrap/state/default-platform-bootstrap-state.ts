/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 *
 * Step        : 03
 *
 * File        : default-platform-bootstrap-state.ts
 * Purpose     : Default Platform Bootstrap State
 * =============================================================================
 */

import {
    PlatformBootstrapHealth
} from "./platform-bootstrap-health";

import type {
    PlatformBootstrapState
} from "./platform-bootstrap-state";

export const DefaultPlatformBootstrapState:
PlatformBootstrapState = {

    health:
        PlatformBootstrapHealth.UNKNOWN

};
