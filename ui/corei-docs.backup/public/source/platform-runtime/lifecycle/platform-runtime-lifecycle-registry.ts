/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 02
 *
 * File        : platform-runtime-lifecycle-registry.ts
 * Purpose     : Platform Runtime Lifecycle Registry
 * =============================================================================
 */

import type {
    PlatformRuntimeLifecycle
} from "./platform-runtime-lifecycle";

const registry:
PlatformRuntimeLifecycle[] = [];

export const PlatformRuntimeLifecycleRegistry:
readonly PlatformRuntimeLifecycle[] = registry;

export function registerPlatformRuntimeLifecycle(
    lifecycle: PlatformRuntimeLifecycle
): void {

    registry.push(lifecycle);

}
