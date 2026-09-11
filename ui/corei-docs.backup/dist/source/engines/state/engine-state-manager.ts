/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 03
 *
 * File        : engine-state-manager.ts
 * Purpose     : Engine State Manager
 * =============================================================================
 */

import {
    EngineStateRegistry,
    registerEngineState
} from "./engine-state-registry";

import type {
    EngineState
} from "./engine-state";

export class EngineStateManager {

    register(
        state: EngineState
    ): void {

        registerEngineState(state);

    }

    getAll():
    readonly EngineState[] {

        return EngineStateRegistry;

    }

}
