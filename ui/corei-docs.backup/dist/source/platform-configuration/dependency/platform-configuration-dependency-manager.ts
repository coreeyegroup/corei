/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 05
 *
 * File        : platform-configuration-dependency-manager.ts
 * Purpose     : Platform Configuration Dependency Manager
 * =============================================================================
 */

import {
    PlatformConfigurationDependencyRegistry,
    registerPlatformConfigurationDependencies
} from "./platform-configuration-dependency-registry";

import type {
    PlatformConfigurationDependencies
} from "./platform-configuration-dependencies";

export class PlatformConfigurationDependencyManager {

    register(
        dependencies: PlatformConfigurationDependencies
    ): void {

        registerPlatformConfigurationDependencies(
            dependencies
        );

    }

    getAll():
    readonly PlatformConfigurationDependencies[] {

        return PlatformConfigurationDependencyRegistry;

    }

}
