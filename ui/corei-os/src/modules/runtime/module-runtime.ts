/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 06
 *
 * File        : module-runtime.ts
 * Purpose     : Module Runtime
 * =============================================================================
 */

import type {
    ModuleRuntimeContext
} from "./module-runtime-context";

export interface ModuleRuntime {

    readonly initialized: boolean;

    readonly context:
        ModuleRuntimeContext;

}
