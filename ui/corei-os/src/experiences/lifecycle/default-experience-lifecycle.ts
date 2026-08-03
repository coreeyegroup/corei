/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 02
 *
 * File        : default-experience-lifecycle.ts
 * Purpose     : Default Experience Lifecycle
 * =============================================================================
 */

import type {
    ExperienceLifecycle
} from "./experience-lifecycle";

export const DefaultExperienceLifecycle:
ExperienceLifecycle = {

    initialize(): void {},

    activate(): void {},

    suspend(): void {},

    resume(): void {},

    deactivate(): void {},

    shutdown(): void {}

};
