/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 03
 *
 * File        : platform-registry-state-manager.ts
 * Purpose     : Platform Registry State Manager
 * =============================================================================
 */

import {

    PlatformRegistryStateRegistry,

    registerPlatformRegistryState

} from "./platform-registry-state-registry";

import type {

    PlatformRegistryState

} from "./platform-registry-state";

export class PlatformRegistryStateManager {

    register(
        state: PlatformRegistryState
    ): void {

        registerPlatformRegistryState(
            state
        );

    }

    getAll():
    readonly PlatformRegistryState[] {

        return PlatformRegistryStateRegistry;

    }

}
