/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 04
 *
 * File        : platform-configuration-composition-registry.ts
 * Purpose     : Platform Configuration Composition Registry
 * =============================================================================
 */

import type {
    PlatformConfigurationComposition
} from "./platform-configuration-composition";

const registry:
PlatformConfigurationComposition[] = [];

export const PlatformConfigurationCompositionRegistry:
readonly PlatformConfigurationComposition[] = registry;

export function registerPlatformConfigurationComposition(
    composition: PlatformConfigurationComposition
): void {

    registry.push(
        composition
    );

}
