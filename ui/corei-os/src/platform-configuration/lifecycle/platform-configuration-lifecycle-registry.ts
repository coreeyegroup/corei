/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 02
 *
 * File        : platform-configuration-lifecycle-registry.ts
 * Purpose     : Platform Configuration Lifecycle Registry
 * =============================================================================
 */

import type {
    PlatformConfigurationLifecycle
} from "./platform-configuration-lifecycle";

const registry:
PlatformConfigurationLifecycle[] = [];

export const PlatformConfigurationLifecycleRegistry:
readonly PlatformConfigurationLifecycle[] = registry;

export function registerPlatformConfigurationLifecycle(
    lifecycle: PlatformConfigurationLifecycle
): void {

    registry.push(
        lifecycle
    );

}
