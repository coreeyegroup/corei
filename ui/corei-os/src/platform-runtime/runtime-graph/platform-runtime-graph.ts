/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 08
 *
 * File        : platform-runtime-graph.ts
 * Purpose     : Platform Runtime Graph
 * =============================================================================
 */

import type {
    PlatformRuntimeNode
} from "./platform-runtime-node";

import type {
    PlatformRuntimeEdge
} from "./platform-runtime-edge";

export interface PlatformRuntimeGraph {

    readonly nodes:
        readonly PlatformRuntimeNode[];

    readonly edges:
        readonly PlatformRuntimeEdge[];

}
