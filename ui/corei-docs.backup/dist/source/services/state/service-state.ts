/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 03
 *
 * File        : service-state.ts
 * Purpose     : Service State
 * =============================================================================
 */

import type {
    ServiceAvailability
} from "./service-availability";

import type {
    ServiceHealth
} from "./service-health";

import type {
    ServiceReadiness
} from "./service-readiness";

import type {
    ServiceStatus
} from "./service-status";

export interface ServiceState {

    readonly status: ServiceStatus;

    readonly health: ServiceHealth;

    readonly readiness: ServiceReadiness;

    readonly availability: ServiceAvailability;

}
