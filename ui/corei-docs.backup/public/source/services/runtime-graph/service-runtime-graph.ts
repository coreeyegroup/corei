/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 09
 *
 * File        : service-runtime-graph.ts
 * Purpose     : Service Runtime Graph
 * =============================================================================
 */

import type {
    ServiceRuntimeNode
} from "./service-runtime-node";

import type {
    ServiceRuntimeEdge
} from "./service-runtime-edge";

export interface ServiceRuntimeGraph {

    readonly nodes:
        readonly ServiceRuntimeNode[];

    readonly edges:
        readonly ServiceRuntimeEdge[];

}
