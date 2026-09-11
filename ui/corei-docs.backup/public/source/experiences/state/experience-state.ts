/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 07
 * Step        : 03
 *
 * File        : experience-state.ts
 * Purpose     : Experience State
 * =============================================================================
 */

import type {
    ExperienceAvailability
} from "./experience-availability";

import type {
    ExperienceHealth
} from "./experience-health";

import type {
    ExperienceReadiness
} from "./experience-readiness";

import type {
    ExperienceStatus
} from "./experience-status";

export interface ExperienceState {

    readonly status: ExperienceStatus;

    readonly health: ExperienceHealth;

    readonly readiness: ExperienceReadiness;

    readonly availability: ExperienceAvailability;

}
