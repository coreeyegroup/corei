/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 09
 *
 * File        : platform-bootstrap-orchestrator-manager.ts
 * Purpose     : Platform Bootstrap Orchestrator Manager
 * =============================================================================
 */

import {
    PlatformBootstrapOrchestratorRegistry,
    registerPlatformBootstrapOrchestrator
} from "./platform-bootstrap-orchestrator-registry";

import type {
    PlatformBootstrapOrchestrator
} from "./platform-bootstrap-orchestrator";

export class PlatformBootstrapOrchestratorManager {

    register(
        orchestrator: PlatformBootstrapOrchestrator
    ): void {

        registerPlatformBootstrapOrchestrator(
            orchestrator
        );

    }

    getAll():
    readonly PlatformBootstrapOrchestrator[] {

        return PlatformBootstrapOrchestratorRegistry;

    }

}
