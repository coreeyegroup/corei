/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 *
 * Step        : 03
 * File        : platform-runtime-state-registry.ts
 * Purpose     : Platform Runtime State Registry
 * =============================================================================
 */

import type {
    PlatformRuntimeState
} from "./platform-runtime-state";

const registry:
PlatformRuntimeState[] = [];

export const PlatformRuntimeStateRegistry:
readonly PlatformRuntimeState[] = registry;

export function registerPlatformRuntimeState(
    state: PlatformRuntimeState
): void {

    registry.push(state);

}
