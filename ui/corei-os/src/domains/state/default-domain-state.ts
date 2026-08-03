/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 03
 *
 * File        : default-domain-state.ts
 * Purpose     : Default Domain State
 * =============================================================================
 */

import type {
    DomainState
} from "./domain-state";

export const DefaultDomainState:
DomainState = {

    enabled: false,

    healthy: false,

    health: "UNKNOWN"

};
