/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 09
 *
 * File        : default-module-runtime-orchestrator.ts
 * Purpose     : Default Module Runtime Orchestrator
 * =============================================================================
 */

import type {
    ModuleRuntimeOrchestrator
} from "./module-runtime-orchestrator";

export const DefaultModuleRuntimeOrchestrator:
ModuleRuntimeOrchestrator = {

    context: {

        executionId: "",

        startedAt: new Date(0)

    }

};
