/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 05
 *
 * File        : platform-bootstrap-dependency-manager.ts
 * Purpose     : Platform Bootstrap Dependency Manager
 * =============================================================================
 */

import {
    PlatformBootstrapDependencyRegistry,
    registerPlatformBootstrapDependencies
} from "./platform-bootstrap-dependency-registry";

import type {
    PlatformBootstrapDependencies
} from "./platform-bootstrap-dependencies";

export class PlatformBootstrapDependencyManager {

    register(
        dependencies: PlatformBootstrapDependencies
    ): void {

        registerPlatformBootstrapDependencies(
            dependencies
        );

    }

    getAll():
    readonly PlatformBootstrapDependencies[] {

        return PlatformBootstrapDependencyRegistry;

    }

}
