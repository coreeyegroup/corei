/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 03
 *
 * File        : application-state.ts
 * Purpose     : Application State
 * =============================================================================
 */

import type {
    ApplicationAvailability
} from "./application-availability";

import type {
    ApplicationHealth
} from "./application-health";

import type {
    ApplicationReadiness
} from "./application-readiness";

import type {
    ApplicationStatus
} from "./application-status";

export interface ApplicationState {

    readonly status: ApplicationStatus;

    readonly health: ApplicationHealth;

    readonly readiness: ApplicationReadiness;

    readonly availability: ApplicationAvailability;

}
