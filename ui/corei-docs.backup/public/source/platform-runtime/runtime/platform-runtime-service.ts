/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 06
 *
 * File        : platform-runtime-service.ts
 * Purpose     : Platform Runtime Service
 * =============================================================================
 */

import type {
    PlatformRuntimeExecutor
} from "./platform-runtime-executor";

import type {
    PlatformRuntimeDispatcher
} from "./platform-runtime-dispatcher";

import type {
    PlatformRuntimeScheduler
} from "./platform-runtime-scheduler";

export interface PlatformRuntimeService {

    readonly executor:
        PlatformRuntimeExecutor;

    readonly dispatcher:
        PlatformRuntimeDispatcher;

    readonly scheduler:
        PlatformRuntimeScheduler;

}
