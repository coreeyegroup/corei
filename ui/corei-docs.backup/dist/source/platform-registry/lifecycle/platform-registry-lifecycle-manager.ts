/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 02
 *
 * File        : platform-registry-lifecycle-manager.ts
 * Purpose     : Platform Registry Lifecycle Manager
 * =============================================================================
 */

import {

    PlatformRegistryLifecycleRegistry,

    registerPlatformRegistryLifecycle

} from "./platform-registry-lifecycle-registry";

import type {

    PlatformRegistryLifecycle

} from "./platform-registry-lifecycle";

export class PlatformRegistryLifecycleManager {

    register(
        lifecycle: PlatformRegistryLifecycle
    ): void {

        registerPlatformRegistryLifecycle(
            lifecycle
        );

    }

    getAll():
    readonly PlatformRegistryLifecycle[] {

        return PlatformRegistryLifecycleRegistry;

    }

}
