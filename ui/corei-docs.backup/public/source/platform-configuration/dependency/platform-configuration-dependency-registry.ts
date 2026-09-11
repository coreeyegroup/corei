/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 05
 *
 * File        : platform-configuration-dependency-registry.ts
 * Purpose     : Platform Configuration Dependency Registry
 * =============================================================================
 */

import type {
    PlatformConfigurationDependencies
} from "./platform-configuration-dependencies";

const registry:
PlatformConfigurationDependencies[] = [];

export const PlatformConfigurationDependencyRegistry:
readonly PlatformConfigurationDependencies[] = registry;

export function registerPlatformConfigurationDependencies(
    dependencies: PlatformConfigurationDependencies
): void {

    registry.push(
        dependencies
    );

}
