/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 05
 *
 * File        : platform-registry-dependency-manager.ts
 * Purpose     : Platform Registry Dependency Manager
 * =============================================================================
 */

import {
    PlatformRegistryDependencyRegistry,
    registerPlatformRegistryDependencies
} from "./platform-registry-dependency-registry";

import type {
    PlatformRegistryDependencies
} from "./platform-registry-dependencies";

export class PlatformRegistryDependencyManager {

    register(
        dependencies: PlatformRegistryDependencies
    ): void {

        registerPlatformRegistryDependencies(
            dependencies
        );

    }

    getAll():
    readonly PlatformRegistryDependencies[] {

        return PlatformRegistryDependencyRegistry;

    }

}
