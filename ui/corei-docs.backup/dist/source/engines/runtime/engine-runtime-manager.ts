/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 06
 *
 * File        : engine-runtime-manager.ts
 * Purpose     : Engine Runtime Manager
 * =============================================================================
 */

import {
    EngineRuntimeRegistry,
    registerEngineRuntime
} from "./engine-runtime-registry";

import type {
    EngineRuntime
} from "./engine-runtime";

export class EngineRuntimeManager {

    register(
        runtime: EngineRuntime
    ): void {

        registerEngineRuntime(
            runtime
        );

    }

    getAll():
    readonly EngineRuntime[] {

        return EngineRuntimeRegistry;

    }

}
