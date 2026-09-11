/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 03
 *
 * File        : platform-bootstrap-state-registry.ts
 * Purpose     : Platform Bootstrap State Registry
 * =============================================================================
 */

import type {
    PlatformBootstrapState
} from "./platform-bootstrap-state";

const registry:
PlatformBootstrapState[] = [];

export const PlatformBootstrapStateRegistry:
readonly PlatformBootstrapState[] = registry;

export function registerPlatformBootstrapState(
    state: PlatformBootstrapState
): void {

    registry.push(
        state
    );

}
