/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 03
 *
 * File        : domain-state-manager.ts
 * Purpose     : Domain State Manager
 * =============================================================================
 */

import {
    DomainStateRegistry,
    registerDomainState
} from "./domain-state-registry";

import type {
    DomainState
} from "./domain-state";

export class DomainStateManager {

    register(
        state: DomainState
    ): void {

        registerDomainState(
            state
        );

    }

    getAll():
    readonly DomainState[] {

        return DomainStateRegistry;

    }

}
