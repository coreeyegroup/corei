/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 08
 *
 * File        : engine-runtime-graph-registry.ts
 * Purpose     : Engine Runtime Graph Registry
 * =============================================================================
 */

import type {
    EngineRuntimeGraph
} from "./engine-runtime-graph";

const registry:
EngineRuntimeGraph[] = [];

export const EngineRuntimeGraphRegistry:
readonly EngineRuntimeGraph[] = registry;

export function registerEngineRuntimeGraph(
    graph: EngineRuntimeGraph
): void {

    registry.push(graph);

}
