/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 05
 *
 * File        : module-dependency.ts
 * Purpose     : Module Dependency
 * =============================================================================
 */

import type {
    ModuleDependencyReference
} from "./module-dependency-reference";

export interface ModuleDependency {

    readonly dependencies:
        readonly ModuleDependencyReference[];

}
