/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 01
 *
 * File        : application-runtime.ts
 * Purpose     : Application Runtime
 * =============================================================================
 */

export interface ApplicationRuntime {

    initialize(): void;

    load(): void;

    activate(): void;

    suspend(): void;

    resume(): void;

    unload(): void;

    shutdown(): void;

}

export const DefaultApplicationRuntime:
ApplicationRuntime = {

    initialize() {},

    load() {},

    activate() {},

    suspend() {},

    resume() {},

    unload() {},

    shutdown() {}

};
