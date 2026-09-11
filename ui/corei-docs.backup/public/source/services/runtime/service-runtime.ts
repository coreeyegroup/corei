/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 05
 *
 * File        : service-runtime.ts
 * Purpose     : Service Runtime
 * =============================================================================
 */

export interface ServiceRuntime {

    initialize(): void;

    load(): void;

    activate(): void;

    suspend(): void;

    resume(): void;

    unload(): void;

    shutdown(): void;

}

export const DefaultServiceRuntime:
ServiceRuntime = {

    initialize(): void {},

    load(): void {},

    activate(): void {},

    suspend(): void {},

    resume(): void {},

    unload(): void {},

    shutdown(): void {}

};
