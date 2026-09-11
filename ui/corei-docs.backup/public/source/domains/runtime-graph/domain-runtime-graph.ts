/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 08
 *
 * File        : domain-runtime-graph.ts
 * Purpose     : Domain Runtime Graph
 * =============================================================================
 */

import type {
    DomainRuntimeNode
} from "./domain-runtime-node";

import type {
    DomainRuntimeEdge
} from "./domain-runtime-edge";

export interface DomainRuntimeGraph {

    readonly nodes:
        readonly DomainRuntimeNode[];

    readonly edges:
        readonly DomainRuntimeEdge[];

}
