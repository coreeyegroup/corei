/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 03
 *
 * File        : platform-bootstrap-state-manager.ts
 * Purpose     : Platform Bootstrap State Manager
 * =============================================================================
 */

import {
    PlatformBootstrapStateRegistry,
    registerPlatformBootstrapState
} from "./platform-bootstrap-state-registry";

import type {
    PlatformBootstrapState
} from "./platform-bootstrap-state";

export class PlatformBootstrapStateManager {

    register(
        state: PlatformBootstrapState
    ): void {

        registerPlatformBootstrapState(
            state
        );

    }

    getAll():
    readonly PlatformBootstrapState[] {

        return PlatformBootstrapStateRegistry;

    }

}
