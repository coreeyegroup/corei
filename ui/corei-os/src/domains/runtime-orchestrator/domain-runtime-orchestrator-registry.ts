/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 09
 *
 * File        : domain-runtime-orchestrator-registry.ts
 * Purpose     : Domain Runtime Orchestrator Registry
 * =============================================================================
 */

import type {
    DomainRuntimeOrchestrator
} from "./domain-runtime-orchestrator";

const registry:
DomainRuntimeOrchestrator[] = [];

export const DomainRuntimeOrchestratorRegistry:
readonly DomainRuntimeOrchestrator[] = registry;

export function registerDomainRuntimeOrchestrator(
    orchestrator: DomainRuntimeOrchestrator
): void {

    registry.push(orchestrator);

}
