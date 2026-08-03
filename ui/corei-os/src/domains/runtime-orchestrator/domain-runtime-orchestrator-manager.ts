/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 09
 *
 * File        : domain-runtime-orchestrator-manager.ts
 * Purpose     : Domain Runtime Orchestrator Manager
 * =============================================================================
 */

import {
    DomainRuntimeOrchestratorRegistry,
    registerDomainRuntimeOrchestrator
} from "./domain-runtime-orchestrator-registry";

import type {
    DomainRuntimeOrchestrator
} from "./domain-runtime-orchestrator";

export class DomainRuntimeOrchestratorManager {

    register(
        orchestrator: DomainRuntimeOrchestrator
    ): void {

        registerDomainRuntimeOrchestrator(
            orchestrator
        );

    }

    getAll():
    readonly DomainRuntimeOrchestrator[] {

        return DomainRuntimeOrchestratorRegistry;

    }

}
