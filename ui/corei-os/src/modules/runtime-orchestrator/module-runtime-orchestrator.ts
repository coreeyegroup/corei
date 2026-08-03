/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 09
 *
 * File        : module-runtime-orchestrator.ts
 * Purpose     : Module Runtime Orchestrator
 * =============================================================================
 */

import type {
    ModuleRuntimeOrchestratorContext
} from "./module-runtime-orchestrator-context";

export interface ModuleRuntimeOrchestrator {

    readonly context:
        ModuleRuntimeOrchestratorContext;

}
