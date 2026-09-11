/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 08
 *
 * File        : engine-runtime-graph.ts
 * Purpose     : Engine Runtime Graph
 * =============================================================================
 */

import type {
    EngineRuntimeNode
} from "./engine-runtime-node";

import type {
    EngineRuntimeEdge
} from "./engine-runtime-edge";

export interface EngineRuntimeGraph {

    readonly nodes:
        readonly EngineRuntimeNode[];

    readonly edges:
        readonly EngineRuntimeEdge[];

}
