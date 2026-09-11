/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 02
 *
 * File        : experience-lifecycle.ts
 * Purpose     : Experience Lifecycle Contract
 * =============================================================================
 */

export interface ExperienceLifecycle {

    initialize(): void;

    activate(): void;

    suspend(): void;

    resume(): void;

    deactivate(): void;

    shutdown(): void;

}
