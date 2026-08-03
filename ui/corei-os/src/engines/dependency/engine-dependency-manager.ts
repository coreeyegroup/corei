/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 05
 *
 * File        : engine-dependency-manager.ts
 * Purpose     : Engine Dependency Manager
 * =============================================================================
 */

import {
    EngineDependencyRegistry,
    registerEngineDependency
} from "./engine-dependency-registry";

import type {
    EngineDependency
} from "./engine-dependency";

export class EngineDependencyManager {

    register(
        dependency: EngineDependency
    ): void {

        registerEngineDependency(
            dependency
        );

    }

    getAll():
    readonly EngineDependency[] {

        return EngineDependencyRegistry;

    }

}
