/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 04
 *
 * File        : engine-composition-registry.ts
 * Purpose     : Engine Composition Registry
 * =============================================================================
 */

import type {
    EngineComposition
} from "./engine-composition";

const registry:
EngineComposition[] = [];

export const EngineCompositionRegistry:
readonly EngineComposition[] = registry;

export function registerEngineComposition(
    composition: EngineComposition
): void {

    registry.push(composition);

}
