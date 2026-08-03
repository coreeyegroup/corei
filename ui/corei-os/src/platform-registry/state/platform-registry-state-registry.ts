/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 03
 *
 * File        : platform-registry-state-registry.ts
 * Purpose     : Platform Registry State Registry
 * =============================================================================
 */

import type {
    PlatformRegistryState
} from "./platform-registry-state";

const registry:
PlatformRegistryState[] = [];

export const PlatformRegistryStateRegistry:
readonly PlatformRegistryState[] = registry;

export function registerPlatformRegistryState(
    state: PlatformRegistryState
): void {

    registry.push(
        state
    );

}
