/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 09
 *
 * File        : module-runtime-orchestrator-registry.ts
 * Purpose     : Module Runtime Orchestrator Registry
 * =============================================================================
 */

import type {
    ModuleRuntimeOrchestrator
} from "./module-runtime-orchestrator";

export const ModuleRuntimeOrchestratorRegistry:
readonly ModuleRuntimeOrchestrator[] = [];
