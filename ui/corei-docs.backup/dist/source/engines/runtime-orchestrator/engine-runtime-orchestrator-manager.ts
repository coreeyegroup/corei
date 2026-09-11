/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 09
 *
 * File        : engine-runtime-orchestrator-manager.ts
 * Purpose     : Engine Runtime Orchestrator Manager
 * =============================================================================
 */

import {
    EngineRuntimeOrchestratorRegistry,
    registerEngineRuntimeOrchestrator
} from "./engine-runtime-orchestrator-registry";

import type {
    EngineRuntimeOrchestrator
} from "./engine-runtime-orchestrator";

export class EngineRuntimeOrchestratorManager {

    register(
        orchestrator: EngineRuntimeOrchestrator
    ): void {

        registerEngineRuntimeOrchestrator(
            orchestrator
        );

    }

    getAll():
    readonly EngineRuntimeOrchestrator[] {

        return EngineRuntimeOrchestratorRegistry;

    }

}
