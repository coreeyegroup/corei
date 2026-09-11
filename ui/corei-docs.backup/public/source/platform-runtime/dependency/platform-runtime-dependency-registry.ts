/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 05
 *
 * File        : platform-runtime-dependency-registry.ts
 * Purpose     : Platform Runtime Dependency Registry
 * =============================================================================
 */

import type {
    PlatformRuntimeDependencies
} from "./platform-runtime-dependencies";

const registry:
PlatformRuntimeDependencies[] = [];

export const PlatformRuntimeDependencyRegistry:
readonly PlatformRuntimeDependencies[] = registry;

export function registerPlatformRuntimeDependencies(
    dependencies: PlatformRuntimeDependencies
): void {

    registry.push(dependencies);

}
