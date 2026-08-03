/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 06
 *
 * File        : platform-runtime-execution-context.ts
 * Purpose     : Platform Runtime Execution Context
 * =============================================================================
 */

import type {
    PlatformRuntimeModel
} from "../models";

export interface PlatformRuntimeExecutionContext {

    readonly runtime:
        PlatformRuntimeModel;

    readonly startedAt:
        Date;

}
