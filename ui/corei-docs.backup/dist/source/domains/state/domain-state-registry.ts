/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 03
 *
 * File        : domain-state-registry.ts
 * Purpose     : Domain State Registry
 * =============================================================================
 */

import type {
    DomainState
} from "./domain-state";

const registry:
DomainState[] = [];

export const DomainStateRegistry:
readonly DomainState[] = registry;

export function registerDomainState(
    state: DomainState
): void {

    registry.push(state);

}
