/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 02
 *
 * File        : engine-lifecycle-manager.ts
 * Purpose     : Engine Lifecycle Manager
 * =============================================================================
 */

import {
    EngineLifecycleRegistry,
    registerEngineLifecycle
} from "./engine-lifecycle-registry";

import type {
    EngineLifecycle
} from "./engine-lifecycle";

export class EngineLifecycleManager {

    register(
        lifecycle: EngineLifecycle
    ): void {

        registerEngineLifecycle(
            lifecycle
        );

    }

    getAll():
    readonly EngineLifecycle[] {

        return EngineLifecycleRegistry;

    }

}
