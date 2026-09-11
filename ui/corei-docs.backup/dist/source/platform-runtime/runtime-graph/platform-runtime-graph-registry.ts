/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 08
 *
 * File        : platform-runtime-graph-registry.ts
 * Purpose     : Platform Runtime Graph Registry
 * =============================================================================
 */

import type {
    PlatformRuntimeGraph
} from "./platform-runtime-graph";

const registry:
PlatformRuntimeGraph[] = [];

export const PlatformRuntimeGraphRegistry:
readonly PlatformRuntimeGraph[] = registry;

export function registerPlatformRuntimeGraph(
    graph: PlatformRuntimeGraph
): void {

    registry.push(graph);

}
