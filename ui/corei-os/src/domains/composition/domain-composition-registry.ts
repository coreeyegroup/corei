/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 04
 *
 * File        : domain-composition-registry.ts
 * Purpose     : Domain Composition Registry
 * =============================================================================
 */

import type {
    DomainComposition
} from "./domain-composition";

const registry:
DomainComposition[] = [];

export const DomainCompositionRegistry:
readonly DomainComposition[] = registry;

export function registerDomainComposition(
    composition: DomainComposition
): void {

    registry.push(composition);

}
