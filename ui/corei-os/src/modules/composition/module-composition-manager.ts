/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 04
 *
 * File        : module-composition-manager.ts
 * Purpose     : Module Composition Manager
 * =============================================================================
 */

import {
    ModuleCompositionRegistry
} from "./module-composition-registry";

import type {
    ModuleComposition
} from "./module-composition";

export class ModuleCompositionManager {

    register(
        composition: ModuleComposition
    ): void {

        (ModuleCompositionRegistry as ModuleComposition[])
            .push(composition);

    }

    getAll():
    readonly ModuleComposition[] {

        return ModuleCompositionRegistry;

    }

}
