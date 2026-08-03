/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 04
 *
 * File        : engine-composition-manager.ts
 * Purpose     : Engine Composition Manager
 * =============================================================================
 */

import {
    EngineCompositionRegistry,
    registerEngineComposition
} from "./engine-composition-registry";

import type {
    EngineComposition
} from "./engine-composition";

export class EngineCompositionManager {

    register(
        composition: EngineComposition
    ): void {

        registerEngineComposition(
            composition
        );

    }

    getAll():
    readonly EngineComposition[] {

        return EngineCompositionRegistry;

    }

}
