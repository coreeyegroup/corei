/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 09
 *
 * File        : engine-runtime-orchestrator.ts
 * Purpose     : Engine Runtime Orchestrator
 * =============================================================================
 */

import type {
    EngineRuntimeOrchestratorContext
} from "./engine-runtime-orchestrator-context";

export interface EngineRuntimeOrchestrator {

    readonly context:
        EngineRuntimeOrchestratorContext;

}
