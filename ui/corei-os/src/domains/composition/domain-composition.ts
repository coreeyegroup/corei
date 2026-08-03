/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 04
 *
 * File        : domain-composition.ts
 * Purpose     : Domain Composition
 * =============================================================================
 */

import type {
    DomainEngineReference
} from "./domain-engine-reference";

export interface DomainComposition {

    readonly engines:
        readonly DomainEngineReference[];

}
