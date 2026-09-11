/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 04
 *
 * File        : engine-composition.ts
 * Purpose     : Engine Composition
 * =============================================================================
 */

import type {
    EngineModuleReference
} from "./engine-module-reference";

export interface EngineComposition {

    readonly modules:
        readonly EngineModuleReference[];

}
