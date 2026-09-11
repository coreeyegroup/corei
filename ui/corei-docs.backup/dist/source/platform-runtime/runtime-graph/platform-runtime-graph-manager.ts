/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 08
 *
 * File        : platform-runtime-graph-manager.ts
 * Purpose     : Platform Runtime Graph Manager
 * =============================================================================
 */

import {
    PlatformRuntimeGraphRegistry,
    registerPlatformRuntimeGraph
} from "./platform-runtime-graph-registry";

import type {
    PlatformRuntimeGraph
} from "./platform-runtime-graph";

export class PlatformRuntimeGraphManager {

    register(
        graph: PlatformRuntimeGraph
    ): void {

        registerPlatformRuntimeGraph(
            graph
        );

    }

    getAll():
    readonly PlatformRuntimeGraph[] {

        return PlatformRuntimeGraphRegistry;

    }

}
