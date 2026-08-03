/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 09
 *
 * File        : workspace-runtime-orchestrator.ts
 * Purpose     : Workspace Runtime Orchestrator
 * =============================================================================
 */

import type {
    WorkspaceRuntime
} from "./workspace-runtime";

export class WorkspaceRuntimeOrchestrator {

    constructor(
        private readonly runtime: WorkspaceRuntime
    ) {}

    public initialize(): void {

        this.runtime.initialize();

    }

    public restore(): void {

        this.runtime.restore();

    }

    public activate(): void {

        this.runtime.activate();

    }

    public suspend(): void {

        this.runtime.suspend();

    }

    public resume(): void {

        this.runtime.resume();

    }

    public deactivate(): void {

        this.runtime.deactivate();

    }

    public shutdown(): void {

        this.runtime.shutdown();

    }

}
