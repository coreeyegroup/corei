/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 06
 *
 * File        : platform-runtime-dispatcher.ts
 * Purpose     : Platform Runtime Dispatcher
 * =============================================================================
 */

import type {
    PlatformRuntimeExecutionContext
} from "./platform-runtime-execution-context";

export interface PlatformRuntimeDispatcher {

    dispatch(
        context: PlatformRuntimeExecutionContext
    ): Promise<void>;

}
