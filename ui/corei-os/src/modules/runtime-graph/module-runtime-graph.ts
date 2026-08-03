/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 08
 *
 * File        : module-runtime-graph.ts
 * Purpose     : Module Runtime Graph
 * =============================================================================
 */

import type {
    ModuleRuntimeNode
} from "./module-runtime-node";

import type {
    ModuleRuntimeEdge
} from "./module-runtime-edge";

export interface ModuleRuntimeGraph {

    readonly nodes:
        readonly ModuleRuntimeNode[];

    readonly edges:
        readonly ModuleRuntimeEdge[];

}
