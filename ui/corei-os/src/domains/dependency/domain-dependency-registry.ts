/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 05
 *
 * File        : domain-dependency-registry.ts
 * Purpose     : Domain Dependency Registry
 * =============================================================================
 */

import type {
    DomainDependency
} from "./domain-dependency";

const registry:
DomainDependency[] = [];

export const DomainDependencyRegistry:
readonly DomainDependency[] = registry;

export function registerDomainDependency(
    dependency: DomainDependency
): void {

    registry.push(dependency);

}
