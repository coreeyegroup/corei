/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 09
 *
 * File        : platform-registry-orchestrator-manager.ts
 * Purpose     : Platform Registry Orchestrator Manager
 * =============================================================================
 */

import {

    PlatformRegistryOrchestratorRegistry,

    registerPlatformRegistryOrchestrator

} from "./platform-registry-orchestrator-registry";

import type {

    PlatformRegistryOrchestrator

} from "./platform-registry-orchestrator";

export class PlatformRegistryOrchestratorManager {

    register(
        orchestrator: PlatformRegistryOrchestrator
    ): void {

        registerPlatformRegistryOrchestrator(
            orchestrator
        );

    }

    getAll():
    readonly PlatformRegistryOrchestrator[] {

        return PlatformRegistryOrchestratorRegistry;

    }

}
