/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 01
 *
 * File        : engine-registry.ts
 * Purpose     : Engine Registry
 * =============================================================================
 */

import type {
    Engine
} from "../models";

const registry:
Engine[] = [];

export const EngineRegistry:
readonly Engine[] = registry;

export function registerEngine(
    engine: Engine
): void {

    registry.push(engine);

}
