/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 02
 *
 * File        : default-application-lifecycle.ts
 * Purpose     : Default Application Lifecycle
 * =============================================================================
 */

import type {
    ApplicationLifecycle
} from "./application-lifecycle";

export const DefaultApplicationLifecycle:
ApplicationLifecycle = {

    initialize() {},

    load() {},

    activate() {},

    suspend() {},

    resume() {},

    unload() {},

    shutdown() {}

};
