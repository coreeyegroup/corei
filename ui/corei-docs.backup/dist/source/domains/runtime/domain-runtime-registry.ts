/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 06
 *
 * File        : domain-runtime-registry.ts
 * Purpose     : Domain Runtime Registry
 * =============================================================================
 */

import type {
    DomainRuntime
} from "./domain-runtime";

const registry:
DomainRuntime[] = [];

export const DomainRuntimeRegistry:
readonly DomainRuntime[] = registry;

export function registerDomainRuntime(
    runtime: DomainRuntime
): void {

    registry.push(runtime);

}
