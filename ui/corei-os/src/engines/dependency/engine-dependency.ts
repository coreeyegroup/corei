/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 05
 *
 * File        : engine-dependency.ts
 * Purpose     : Engine Dependency
 * =============================================================================
 */

import type {
    EngineDependencyReference
} from "./engine-dependency-reference";

export interface EngineDependency {

    readonly dependencies:
        readonly EngineDependencyReference[];

}
