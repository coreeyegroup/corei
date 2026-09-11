/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 06
 *
 * File        : module-runtime-manager.ts
 * Purpose     : Module Runtime Manager
 * =============================================================================
 */

import {
    ModuleRuntimeRegistry
} from "./module-runtime-registry";

import type {
    ModuleRuntime
} from "./module-runtime";

export class ModuleRuntimeManager {

    register(
        runtime: ModuleRuntime
    ): void {

        (ModuleRuntimeRegistry as ModuleRuntime[])
            .push(runtime);

    }

    getAll():
    readonly ModuleRuntime[] {

        return ModuleRuntimeRegistry;

    }

}
