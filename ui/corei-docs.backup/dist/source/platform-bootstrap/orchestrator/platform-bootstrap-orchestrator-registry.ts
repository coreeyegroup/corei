/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 09
 *
 * File        : platform-bootstrap-orchestrator-registry.ts
 * Purpose     : Platform Bootstrap Orchestrator Registry
 * =============================================================================
 */

import type {
    PlatformBootstrapOrchestrator
} from "./platform-bootstrap-orchestrator";

const registry:
PlatformBootstrapOrchestrator[] = [];

export const PlatformBootstrapOrchestratorRegistry:
readonly PlatformBootstrapOrchestrator[] = registry;

export function registerPlatformBootstrapOrchestrator(
    orchestrator: PlatformBootstrapOrchestrator
): void {

    registry.push(
        orchestrator
    );

}
