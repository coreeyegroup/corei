/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 02
 *
 * File        : domain-lifecycle-registry.ts
 * Purpose     : Domain Lifecycle Registry
 * =============================================================================
 */

import type {
    DomainLifecycle
} from "./domain-lifecycle";

const registry:
DomainLifecycle[] = [];

export const DomainLifecycleRegistry:
readonly DomainLifecycle[] = registry;

export function registerDomainLifecycle(
    lifecycle: DomainLifecycle
): void {

    registry.push(lifecycle);

}
