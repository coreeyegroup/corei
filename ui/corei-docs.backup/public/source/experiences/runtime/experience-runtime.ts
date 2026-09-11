/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 05
 *
 * File        : experience-runtime.ts
 * Purpose     : Experience Runtime Contract
 * =============================================================================
 */

export interface ExperienceRuntime {

    initialize(): void;

    load(): void;

    activate(): void;

    suspend(): void;

    resume(): void;

    unload(): void;

    shutdown(): void;

}

export const DefaultExperienceRuntime:
ExperienceRuntime = {

    initialize(): void {},

    load(): void {},

    activate(): void {},

    suspend(): void {},

    resume(): void {},

    unload(): void {},

    shutdown(): void {}

};
