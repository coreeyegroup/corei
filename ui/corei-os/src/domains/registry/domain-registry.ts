/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 01
 *
 * File        : domain-registry.ts
 * Purpose     : Domain Registry
 * =============================================================================
 */

import type {
    Domain
} from "../contracts/domain";

const registry:
Domain[] = [];

export const DomainRegistry:
readonly Domain[] = registry;

export function registerDomain(
    domain: Domain
): void {

    registry.push(domain);

}
