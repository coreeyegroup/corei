/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 12
 * Step        : 07
 *
 * File        : domain-integration-registry.ts
 * Purpose     : Domain Integration Registry
 * =============================================================================
 */

import type {
    DomainIntegration
} from "./domain-integration";

const registry:
DomainIntegration[] = [];

export const DomainIntegrationRegistry:
readonly DomainIntegration[] = registry;

export function registerDomainIntegration(
    integration: DomainIntegration
): void {

    registry.push(integration);

}
