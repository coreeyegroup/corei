/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 09
 *
 * File        : platform-runtime-coordination-service.ts
 * Purpose     : Platform Runtime Coordination Service
 * =============================================================================
 */

import type {
    PlatformRuntimeExecutionPlan
} from "./platform-runtime-execution-plan";

export interface PlatformRuntimeCoordinationService {

    coordinate(
        plan: PlatformRuntimeExecutionPlan
    ): Promise<void>;

}
