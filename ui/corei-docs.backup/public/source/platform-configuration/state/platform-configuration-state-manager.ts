/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 03
 *
 * File        : platform-configuration-state-manager.ts
 * Purpose     : Platform Configuration State Manager
 * =============================================================================
 */

import {

    PlatformConfigurationStateRegistry,

    registerPlatformConfigurationState

} from "./platform-configuration-state-registry";

import type {

    PlatformConfigurationState

} from "./platform-configuration-state";

export class PlatformConfigurationStateManager {

    register(
        state: PlatformConfigurationState
    ): void {

        registerPlatformConfigurationState(
            state
        );

    }

    getAll():
    readonly PlatformConfigurationState[] {

        return PlatformConfigurationStateRegistry;

    }

}
