/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 04
 *
 * File        : platform-bootstrap-composition-registry.ts
 * Purpose     : Platform Bootstrap Composition Registry
 * =============================================================================
 */

import type {
    PlatformBootstrapComposition
} from "./platform-bootstrap-composition";

const registry:
PlatformBootstrapComposition[] = [];

export const PlatformBootstrapCompositionRegistry:
readonly PlatformBootstrapComposition[] = registry;

export function registerPlatformBootstrapComposition(
    composition: PlatformBootstrapComposition
): void {

    registry.push(
        composition
    );

}
