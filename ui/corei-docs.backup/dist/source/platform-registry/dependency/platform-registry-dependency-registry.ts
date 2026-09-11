/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 05
 *
 * File        : platform-registry-dependency-registry.ts
 * Purpose     : Platform Registry Dependency Registry
 * =============================================================================
 */

import type {
    PlatformRegistryDependencies
} from "./platform-registry-dependencies";

const registry:
PlatformRegistryDependencies[] = [];

export const PlatformRegistryDependencyRegistry:
readonly PlatformRegistryDependencies[] = registry;

export function registerPlatformRegistryDependencies(
    dependencies: PlatformRegistryDependencies
): void {

    registry.push(
        dependencies
    );

}
