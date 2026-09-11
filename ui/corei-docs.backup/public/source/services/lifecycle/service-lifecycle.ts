/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 02
 *
 * File        : service-lifecycle.ts
 * Purpose     : Service Lifecycle Contract
 * =============================================================================
 */

export interface ServiceLifecycle {

    initialize(): void;

    start(): void;

    stop(): void;

    shutdown(): void;

}
