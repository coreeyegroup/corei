/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 09
 *
 * File        : platform-configuration-orchestrator-registry.ts
 * Purpose     : Platform Configuration Orchestrator Registry
 * =============================================================================
 */

import type {
    PlatformConfigurationOrchestrator
} from "./platform-configuration-orchestrator";

const registry:
PlatformConfigurationOrchestrator[] = [];

export const PlatformConfigurationOrchestratorRegistry:
readonly PlatformConfigurationOrchestrator[] = registry;

export function registerPlatformConfigurationOrchestrator(
    orchestrator: PlatformConfigurationOrchestrator
): void {

    registry.push(
        orchestrator
    );

}
