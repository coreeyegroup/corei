/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 02
 *
 * File        : application-lifecycle.ts
 * Purpose     : Application Lifecycle Contract
 * =============================================================================
 */

export interface ApplicationLifecycle {

    initialize(): void;

    load(): void;

    activate(): void;

    suspend(): void;

    resume(): void;

    unload(): void;

    shutdown(): void;

}
