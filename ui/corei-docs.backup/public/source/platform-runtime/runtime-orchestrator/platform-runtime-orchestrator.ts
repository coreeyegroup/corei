/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 09
 *
 * File        : platform-runtime-orchestrator.ts
 * Purpose     : Platform Runtime Orchestrator
 * =============================================================================
 */

import type {
    PlatformRuntimeCoordinationService
} from "./platform-runtime-coordination-service";

import type {
    PlatformRuntimeExecutionPlan
} from "./platform-runtime-execution-plan";

import type {
    PlatformRuntimeStartupStrategy
} from "./platform-runtime-startup-strategy";

import type {
    PlatformRuntimeShutdownStrategy
} from "./platform-runtime-shutdown-strategy";

export interface PlatformRuntimeOrchestrator {

    readonly startup:
        PlatformRuntimeStartupStrategy;

    readonly shutdown:
        PlatformRuntimeShutdownStrategy;

    readonly coordination:
        PlatformRuntimeCoordinationService;

    execute(
        plan: PlatformRuntimeExecutionPlan
    ): Promise<void>;

}
