/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 06
 *
 * File        : default-engine-runtime.ts
 * Purpose     : Default Engine Runtime
 * =============================================================================
 */

import type {
    EngineRuntime
} from "./engine-runtime";

export const DefaultEngineRuntime:
EngineRuntime = {

    context: {

        runtimeId: "",

        startedAt: new Date(0)

    }

};
