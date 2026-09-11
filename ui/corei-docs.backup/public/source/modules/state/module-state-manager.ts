/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 03
 *
 * File        : module-state-manager.ts
 * Purpose     : Module State Manager
 * =============================================================================
 */

import {
    ModuleStateRegistry
} from "./module-state-registry";

import type {
    ModuleState
} from "./module-state";

export class ModuleStateManager {

    register(
        state: ModuleState
    ): void {

        (ModuleStateRegistry as ModuleState[])
            .push(state);

    }

    getAll():
    readonly ModuleState[] {

        return ModuleStateRegistry;

    }

}
