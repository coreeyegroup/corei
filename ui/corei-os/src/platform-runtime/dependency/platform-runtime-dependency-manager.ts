/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 05
 *
 * File        : platform-runtime-dependency-manager.ts
 * Purpose     : Platform Runtime Dependency Manager
 * =============================================================================
 */

import {
    PlatformRuntimeDependencyRegistry,
    registerPlatformRuntimeDependencies
} from "./platform-runtime-dependency-registry";

import type {
    PlatformRuntimeDependencies
} from "./platform-runtime-dependencies";

export class PlatformRuntimeDependencyManager {

    register(
        dependencies: PlatformRuntimeDependencies
    ): void {

        registerPlatformRuntimeDependencies(
            dependencies
        );

    }

    getAll():
    readonly PlatformRuntimeDependencies[] {

        return PlatformRuntimeDependencyRegistry;

    }

}
