/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 09
 *
 * File        : platform-registry-orchestrator-registry.ts
 * Purpose     : Platform Registry Orchestrator Registry
 * =============================================================================
 */

import type {
    PlatformRegistryOrchestrator
} from "./platform-registry-orchestrator";

const registry:
PlatformRegistryOrchestrator[] = [];

export const PlatformRegistryOrchestratorRegistry:
readonly PlatformRegistryOrchestrator[] = registry;

export function registerPlatformRegistryOrchestrator(
    orchestrator: PlatformRegistryOrchestrator
): void {

    registry.push(
        orchestrator
    );

}
