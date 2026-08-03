/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 09
 *
 * File        : runtime-graph.ts
 * Purpose     : Experience Runtime Graph
 * =============================================================================
 */

import type {
    RuntimeGraphNode
} from "./runtime-graph-node";

import type {
    RuntimeGraphEdge
} from "./runtime-graph-edge";

export interface RuntimeGraph {

    readonly nodes:
        readonly RuntimeGraphNode[];

    readonly edges:
        readonly RuntimeGraphEdge[];

}
