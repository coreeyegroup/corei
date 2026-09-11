/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 10
 *
 * File        : application-runtime-orchestrator.ts
 * Purpose     : Application Runtime Orchestrator
 * =============================================================================
 */

import type {
    ApplicationRuntime
} from "./application-runtime";

export class ApplicationRuntimeOrchestrator {

    constructor(
        private readonly runtime: ApplicationRuntime
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

}
