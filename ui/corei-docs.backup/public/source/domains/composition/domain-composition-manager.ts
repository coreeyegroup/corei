/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 04
 *
 * File        : domain-composition-manager.ts
 * Purpose     : Domain Composition Manager
 * =============================================================================
 */

import {
    DomainCompositionRegistry,
    registerDomainComposition
} from "./domain-composition-registry";

import type {
    DomainComposition
} from "./domain-composition";

export class DomainCompositionManager {

    register(
        composition: DomainComposition
    ): void {

        registerDomainComposition(
            composition
        );

    }

    getAll():
    readonly DomainComposition[] {

        return DomainCompositionRegistry;

    }

}
