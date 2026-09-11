/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 07
 *
 * File        : engine-integration-registry.ts
 * Purpose     : Engine Integration Registry
 * =============================================================================
 */

import type {
    EngineIntegration
} from "./engine-integration";

const registry:
EngineIntegration[] = [];

export const EngineIntegrationRegistry:
readonly EngineIntegration[] = registry;

export function registerEngineIntegration(
    integration: EngineIntegration
): void {

    registry.push(integration);

}
