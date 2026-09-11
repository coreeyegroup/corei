/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 03
 *
 * File        : capability-state.ts
 * Purpose     : Capability Runtime State
 * =============================================================================
 */

import type { CapabilityAvailability } from "./capability-availability";
import type { CapabilityHealth } from "./capability-health";
import type { CapabilityReadiness } from "./capability-readiness";
import type { CapabilityStatus } from "./capability-status";

export interface CapabilityState {

    readonly status: CapabilityStatus;

    readonly health: CapabilityHealth;

    readonly readiness: CapabilityReadiness;

    readonly availability: CapabilityAvailability;

}
