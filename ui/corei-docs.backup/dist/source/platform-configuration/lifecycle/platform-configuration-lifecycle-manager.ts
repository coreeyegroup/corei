/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 02
 *
 * File        : platform-configuration-lifecycle-manager.ts
 * Purpose     : Platform Configuration Lifecycle Manager
 * =============================================================================
 */

import {
    PlatformConfigurationLifecycleRegistry,
    registerPlatformConfigurationLifecycle
} from "./platform-configuration-lifecycle-registry";

import type {
    PlatformConfigurationLifecycle
} from "./platform-configuration-lifecycle";

export class PlatformConfigurationLifecycleManager {

    register(
        lifecycle: PlatformConfigurationLifecycle
    ): void {

        registerPlatformConfigurationLifecycle(
            lifecycle
        );

    }

    getAll():
    readonly PlatformConfigurationLifecycle[] {

        return PlatformConfigurationLifecycleRegistry;

    }

}
