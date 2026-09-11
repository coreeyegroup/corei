/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 02
 *
 * File        : platform-bootstrap-lifecycle-registry.ts
 * Purpose     : Platform Bootstrap Lifecycle Registry
 * =============================================================================
 */

import type {
    PlatformBootstrapLifecycle
} from "./platform-bootstrap-lifecycle";

const registry:
PlatformBootstrapLifecycle[] = [];

export const PlatformBootstrapLifecycleRegistry:
readonly PlatformBootstrapLifecycle[] = registry;

export function registerPlatformBootstrapLifecycle(
    lifecycle: PlatformBootstrapLifecycle
): void {

    registry.push(
        lifecycle
    );

}
