/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 04
 *
 * File        : platform-registry-composition-registry.ts
 * Purpose     : Platform Registry Composition Registry
 * =============================================================================
 */

import type {
    PlatformRegistryComposition
} from "./platform-registry-composition";

const registry:
PlatformRegistryComposition[] = [];

export const PlatformRegistryCompositionRegistry:
readonly PlatformRegistryComposition[] = registry;

export function registerPlatformRegistryComposition(
    composition: PlatformRegistryComposition
): void {

    registry.push(
        composition
    );

}
