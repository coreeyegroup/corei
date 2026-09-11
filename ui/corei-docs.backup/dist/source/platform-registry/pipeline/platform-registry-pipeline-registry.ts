/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 08
 *
 * File        : platform-registry-pipeline-registry.ts
 * Purpose     : Platform Registry Pipeline Registry
 * =============================================================================
 */

import type {
    PlatformRegistryPipeline
} from "./platform-registry-pipeline";

const registry:
PlatformRegistryPipeline[] = [];

export const PlatformRegistryPipelineRegistry:
readonly PlatformRegistryPipeline[] = registry;

export function registerPlatformRegistryPipeline(
    pipeline: PlatformRegistryPipeline
): void {

    registry.push(
        pipeline
    );

}
