/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 05
 *
 * File        : platform-bootstrap-dependency-registry.ts
 * Purpose     : Platform Bootstrap Dependency Registry
 * =============================================================================
 */

import type {
    PlatformBootstrapDependencies
} from "./platform-bootstrap-dependencies";

const registry:
PlatformBootstrapDependencies[] = [];

export const PlatformBootstrapDependencyRegistry:
readonly PlatformBootstrapDependencies[] = registry;

export function registerPlatformBootstrapDependencies(
    dependencies: PlatformBootstrapDependencies
): void {

    registry.push(
        dependencies
    );

}
