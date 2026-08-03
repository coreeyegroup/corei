/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 10
 *
 * File        : experience-runtime-orchestrator.ts
 * Purpose     : Experience Runtime Orchestrator
 * =============================================================================
 */

import type {
    ExperienceRuntime
} from "./experience-runtime";

export class ExperienceRuntimeOrchestrator {

    constructor(
        private readonly runtime: ExperienceRuntime
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
