/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 03
 *
 * File        : domain-state.ts
 * Purpose     : Domain State
 * =============================================================================
 */

import type {
    DomainHealthStatus
} from "./domain-health-status";

export interface DomainState {

    readonly enabled: boolean;

    readonly healthy: boolean;

    readonly health:
        DomainHealthStatus;

}
