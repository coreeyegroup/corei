/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 06
 *
 * File        : default-module-runtime.ts
 * Purpose     : Default Module Runtime
 * =============================================================================
 */

import type {
    ModuleRuntime
} from "./module-runtime";

export const DefaultModuleRuntime:
ModuleRuntime = {

    initialized: false,

    context: {

        id: "",

        startedAt: new Date(0)

    }

};
