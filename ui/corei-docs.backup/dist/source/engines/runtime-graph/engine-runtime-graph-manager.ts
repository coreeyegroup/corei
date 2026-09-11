/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 08
 *
 * File        : engine-runtime-graph-manager.ts
 * Purpose     : Engine Runtime Graph Manager
 * =============================================================================
 */

import {
    EngineRuntimeGraphRegistry,
    registerEngineRuntimeGraph
} from "./engine-runtime-graph-registry";

import type {
    EngineRuntimeGraph
} from "./engine-runtime-graph";

export class EngineRuntimeGraphManager {

    register(
        graph: EngineRuntimeGraph
    ): void {

        registerEngineRuntimeGraph(
            graph
        );

    }

    getAll():
    readonly EngineRuntimeGraph[] {

        return EngineRuntimeGraphRegistry;

    }

}
