/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 03
 *
 * File        : platform-bootstrap-state.ts
 * Purpose     : Platform Bootstrap State
 * =============================================================================
 */

import type {
    PlatformBootstrapHealth
} from "./platform-bootstrap-health";

export interface PlatformBootstrapState {

    readonly health:
        PlatformBootstrapHealth;

}
