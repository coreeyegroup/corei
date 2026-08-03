/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 02
 *
 * File        : platform-bootstrap-lifecycle-manager.ts
 * Purpose     : Platform Bootstrap Lifecycle Manager
 * =============================================================================
 */

import {
    PlatformBootstrapLifecycleRegistry,
    registerPlatformBootstrapLifecycle
} from "./platform-bootstrap-lifecycle-registry";

import type {
    PlatformBootstrapLifecycle
} from "./platform-bootstrap-lifecycle";

export class PlatformBootstrapLifecycleManager {

    register(
        lifecycle: PlatformBootstrapLifecycle
    ): void {

        registerPlatformBootstrapLifecycle(
            lifecycle
        );

    }

    getAll():
    readonly PlatformBootstrapLifecycle[] {

        return PlatformBootstrapLifecycleRegistry;

    }

}
