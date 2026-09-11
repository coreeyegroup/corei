/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 03
 *
 * File        : engine-state-registry.ts
 * Purpose     : Engine State Registry
 * =============================================================================
 */

import type {
    EngineState
} from "./engine-state";

const registry:
EngineState[] = [];

export const EngineStateRegistry:
readonly EngineState[] = registry;

export function registerEngineState(
    state: EngineState
): void {

    registry.push(state);

}
