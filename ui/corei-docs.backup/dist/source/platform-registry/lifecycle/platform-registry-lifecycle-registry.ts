/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 02
 *
 * File        : platform-registry-lifecycle-registry.ts
 * Purpose     : Platform Registry Lifecycle Registry
 * =============================================================================
 */

import type {
    PlatformRegistryLifecycle
} from "./platform-registry-lifecycle";

const registry:
PlatformRegistryLifecycle[] = [];

export const PlatformRegistryLifecycleRegistry:
readonly PlatformRegistryLifecycle[] = registry;

export function registerPlatformRegistryLifecycle(
    lifecycle: PlatformRegistryLifecycle
): void {

    registry.push(
        lifecycle
    );

}
