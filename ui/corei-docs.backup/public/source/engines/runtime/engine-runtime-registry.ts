/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 06
 *
 * File        : engine-runtime-registry.ts
 * Purpose     : Engine Runtime Registry
 * =============================================================================
 */

import type {
    EngineRuntime
} from "./engine-runtime";

const registry:
EngineRuntime[] = [];

export const EngineRuntimeRegistry:
readonly EngineRuntime[] = registry;

export function registerEngineRuntime(
    runtime: EngineRuntime
): void {

    registry.push(runtime);

}
