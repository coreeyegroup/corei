/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 06
 *
 * File        : engine-runtime.ts
 * Purpose     : Engine Runtime
 * =============================================================================
 */

import type {
    EngineRuntimeContext
} from "./engine-runtime-context";

export interface EngineRuntime {

    readonly context:
        EngineRuntimeContext;

}
