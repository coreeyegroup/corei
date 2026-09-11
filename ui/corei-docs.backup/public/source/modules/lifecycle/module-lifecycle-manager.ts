/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 02
 *
 * File        : module-lifecycle-manager.ts
 * Purpose     : Module Lifecycle Manager
 * =============================================================================
 */

import {
    ModuleLifecycleRegistry
} from "./module-lifecycle-registry";

import type {
    ModuleLifecycle
} from "./module-lifecycle";

export class ModuleLifecycleManager {

    register(
        lifecycle: ModuleLifecycle
    ): void {

        (ModuleLifecycleRegistry as ModuleLifecycle[])
            .push(lifecycle);

    }

    getAll():
    readonly ModuleLifecycle[] {

        return ModuleLifecycleRegistry;

    }

}
