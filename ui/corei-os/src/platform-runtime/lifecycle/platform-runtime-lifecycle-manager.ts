/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 02
 *
 * File        : platform-runtime-lifecycle-manager.ts
 * Purpose     : Platform Runtime Lifecycle Manager
 * =============================================================================
 */

import {
    PlatformRuntimeLifecycleRegistry,
    registerPlatformRuntimeLifecycle
} from "./platform-runtime-lifecycle-registry";

import type {
    PlatformRuntimeLifecycle
} from "./platform-runtime-lifecycle";

export class PlatformRuntimeLifecycleManager {

    register(
        lifecycle: PlatformRuntimeLifecycle
    ): void {

        registerPlatformRuntimeLifecycle(
            lifecycle
        );

    }

    getAll():
    readonly PlatformRuntimeLifecycle[] {

        return PlatformRuntimeLifecycleRegistry;

    }

}
