/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 04
 *
 * File        : module-composition.ts
 * Purpose     : Module Composition
 * =============================================================================
 */

import type {
    ModuleServiceReference
} from "./module-service-reference";

export interface ModuleComposition {

    readonly services:
        readonly ModuleServiceReference[];

}
