/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 05
 *
 * File        : module-dependency-manager.ts
 * Purpose     : Module Dependency Manager
 * =============================================================================
 */

import {
    ModuleDependencyRegistry
} from "./module-dependency-registry";

import type {
    ModuleDependency
} from "./module-dependency";

export class ModuleDependencyManager {

    register(
        dependency: ModuleDependency
    ): void {

        (ModuleDependencyRegistry as ModuleDependency[])
            .push(dependency);

    }

    getAll():
    readonly ModuleDependency[] {

        return ModuleDependencyRegistry;

    }

}
