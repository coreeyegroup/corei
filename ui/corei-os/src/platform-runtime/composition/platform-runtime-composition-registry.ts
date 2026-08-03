/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 04
 *
 * File        : platform-runtime-composition-registry.ts
 * Purpose     : Platform Runtime Composition Registry
 * =============================================================================
 */

import type {
    PlatformRuntimeComposition
} from "./platform-runtime-composition";

const registry:
PlatformRuntimeComposition[] = [];

export const PlatformRuntimeCompositionRegistry:
readonly PlatformRuntimeComposition[] = registry;

export function registerPlatformRuntimeComposition(
    composition: PlatformRuntimeComposition
): void {

    registry.push(composition);

}
