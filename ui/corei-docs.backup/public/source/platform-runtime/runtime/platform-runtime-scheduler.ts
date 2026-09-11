/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 06
 *
 * File        : platform-runtime-scheduler.ts
 * Purpose     : Platform Runtime Scheduler
 * =============================================================================
 */

import type {
    PlatformRuntimeExecutionContext
} from "./platform-runtime-execution-context";

export interface PlatformRuntimeScheduler {

    schedule(
        context: PlatformRuntimeExecutionContext
    ): Promise<void>;

}
