/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 09
 *
 * File        : engine-runtime-orchestrator-registry.ts
 * Purpose     : Engine Runtime Orchestrator Registry
 * =============================================================================
 */

import type {
    EngineRuntimeOrchestrator
} from "./engine-runtime-orchestrator";

const registry:
EngineRuntimeOrchestrator[] = [];

export const EngineRuntimeOrchestratorRegistry:
readonly EngineRuntimeOrchestrator[] = registry;

export function registerEngineRuntimeOrchestrator(
    orchestrator: EngineRuntimeOrchestrator
): void {

    registry.push(orchestrator);

}
