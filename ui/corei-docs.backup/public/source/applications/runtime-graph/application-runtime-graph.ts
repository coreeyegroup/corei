/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 09
 *
 * File        : application-runtime-graph.ts
 * Purpose     : Application Runtime Graph
 * =============================================================================
 */

import type {
    ApplicationRuntimeNode
} from "./application-runtime-node";

import type {
    ApplicationRuntimeEdge
} from "./application-runtime-edge";

export interface ApplicationRuntimeGraph {

    readonly nodes:
        readonly ApplicationRuntimeNode[];

    readonly edges:
        readonly ApplicationRuntimeEdge[];

}
