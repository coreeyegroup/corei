/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 06
 *
 * File        : platform-runtime-executor.ts
 * Purpose     : Platform Runtime Executor
 * =============================================================================
 */

import type {
    PlatformRuntimeModel
} from "../models";

export interface PlatformRuntimeExecutor {

    execute(
        runtime: PlatformRuntimeModel
    ): Promise<void>;

}
