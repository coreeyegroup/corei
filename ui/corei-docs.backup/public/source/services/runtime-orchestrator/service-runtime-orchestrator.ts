/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 10
 *
 * File        : service-runtime-orchestrator.ts
 * Purpose     : Service Runtime Orchestrator
 * =============================================================================
 */

import type {
    ServiceRuntime
} from "../runtime";

import type {
    ServiceRuntimeGraph
} from "../runtime-graph";

export class ServiceRuntimeOrchestrator {

    constructor(

        private readonly runtime: ServiceRuntime,

        private readonly graph: ServiceRuntimeGraph

    ) {}

    initialize(): void {

        this.runtime.initialize();

    }

    load(): void {

        this.runtime.load();

    }

    activate(): void {

        this.runtime.activate();

    }

    suspend(): void {

        this.runtime.suspend();

    }

    resume(): void {

        this.runtime.resume();

    }

    unload(): void {

        this.runtime.unload();

    }

    shutdown(): void {

        this.runtime.shutdown();

    }

    getRuntimeGraph(): ServiceRuntimeGraph {

        return this.graph;

    }

}
