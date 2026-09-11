/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 08
 *
 * File        : platform-configuration-pipeline-registry.ts
 * Purpose     : Platform Configuration Pipeline Registry
 * =============================================================================
 */

import type {
    PlatformConfigurationPipeline
} from "./platform-configuration-pipeline";

const registry:
PlatformConfigurationPipeline[] = [];

export const PlatformConfigurationPipelineRegistry:
readonly PlatformConfigurationPipeline[] = registry;

export function registerPlatformConfigurationPipeline(
    pipeline: PlatformConfigurationPipeline
): void {

    registry.push(
        pipeline
    );

}
