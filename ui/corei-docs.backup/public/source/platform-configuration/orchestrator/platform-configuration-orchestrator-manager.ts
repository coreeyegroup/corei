/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 09
 *
 * File        : platform-configuration-orchestrator-manager.ts
 * Purpose     : Platform Configuration Orchestrator Manager
 * =============================================================================
 */

import {

    PlatformConfigurationOrchestratorRegistry,

    registerPlatformConfigurationOrchestrator

} from "./platform-configuration-orchestrator-registry";

import type {

    PlatformConfigurationOrchestrator

} from "./platform-configuration-orchestrator";

export class PlatformConfigurationOrchestratorManager {

    register(
        orchestrator: PlatformConfigurationOrchestrator
    ): void {

        registerPlatformConfigurationOrchestrator(
            orchestrator
        );

    }

    getAll():
    readonly PlatformConfigurationOrchestrator[] {

        return PlatformConfigurationOrchestratorRegistry;

    }

}
