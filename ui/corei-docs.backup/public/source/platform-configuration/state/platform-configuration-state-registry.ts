/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 *
 * Step        : 03
 * File        : platform-configuration-state-registry.ts
 * Purpose     : Platform Configuration State Registry
 * =============================================================================
 */

import type {
    PlatformConfigurationState
} from "./platform-configuration-state";

const registry:
PlatformConfigurationState[] = [];

export const PlatformConfigurationStateRegistry:
readonly PlatformConfigurationState[] = registry;

export function registerPlatformConfigurationState(
    state: PlatformConfigurationState
): void {

    registry.push(
        state
    );

}
