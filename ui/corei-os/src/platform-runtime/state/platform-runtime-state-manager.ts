/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 03
 *
 * File        : platform-runtime-state-manager.ts
 * Purpose     : Platform Runtime State Manager
 * =============================================================================
 */

import {
    PlatformRuntimeStateRegistry,
    registerPlatformRuntimeState
} from "./platform-runtime-state-registry";

import type {
    PlatformRuntimeState
} from "./platform-runtime-state";

export class PlatformRuntimeStateManager {

    register(
        state: PlatformRuntimeState
    ): void {

        registerPlatformRuntimeState(
            state
        );

    }

    getAll():
    readonly PlatformRuntimeState[] {

        return PlatformRuntimeStateRegistry;

    }

}
