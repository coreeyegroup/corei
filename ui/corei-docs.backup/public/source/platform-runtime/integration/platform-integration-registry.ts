/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 07
 *
 * File        : platform-integration-registry.ts
 * Purpose     : Platform Integration Registry
 * =============================================================================
 */

import type {
    PlatformIntegration
} from "./platform-integration";

const registry:
PlatformIntegration[] = [];

export const PlatformIntegrationRegistry:
readonly PlatformIntegration[] = registry;

export function registerPlatformIntegration(
    integration: PlatformIntegration
): void {

    registry.push(integration);

}
