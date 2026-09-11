/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 09
 *
 * File        : module-runtime-orchestrator-manager.ts
 * Purpose     : Module Runtime Orchestrator Manager
 * =============================================================================
 */

import {
    ModuleRuntimeOrchestratorRegistry
} from "./module-runtime-orchestrator-registry";

import type {
    ModuleRuntimeOrchestrator
} from "./module-runtime-orchestrator";

export class ModuleRuntimeOrchestratorManager {

    register(
        orchestrator: ModuleRuntimeOrchestrator
    ): void {

        (
            ModuleRuntimeOrchestratorRegistry as ModuleRuntimeOrchestrator[]
        ).push(orchestrator);

    }

    getAll():
    readonly ModuleRuntimeOrchestrator[] {

        return ModuleRuntimeOrchestratorRegistry;

    }

}
