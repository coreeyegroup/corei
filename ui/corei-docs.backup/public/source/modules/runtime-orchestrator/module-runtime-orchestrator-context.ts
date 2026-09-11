/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 09
 *
 * File        : module-runtime-orchestrator-context.ts
 * Purpose     : Module Runtime Orchestrator Context
 * =============================================================================
 */

export interface ModuleRuntimeOrchestratorContext {

    readonly executionId: string;

    readonly startedAt: Date;

}
