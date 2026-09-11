/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 02
 *
 * File        : platform-runtime-lifecycle.ts
 * Purpose     : Platform Runtime Lifecycle
 * =============================================================================
 */

import type {
    PlatformRuntimeLifecycleStatus
} from "./platform-runtime-lifecycle-status";

export interface PlatformRuntimeLifecycle {

    readonly status:
        PlatformRuntimeLifecycleStatus;

}
