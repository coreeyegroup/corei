/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 02
 *
 * File        : capability-lifecycle.ts
 * Purpose     : Capability Lifecycle Contract
 * =============================================================================
 */

export interface CapabilityLifecycle {

    initialize(): void;

    activate(): void;

    suspend(): void;

    recover(): void;

    shutdown(): void;

}
