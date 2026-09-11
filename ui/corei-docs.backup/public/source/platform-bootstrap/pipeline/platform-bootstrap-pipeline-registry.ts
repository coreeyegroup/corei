/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 08
 *
 * File        : platform-bootstrap-pipeline-registry.ts
 * Purpose     : Platform Bootstrap Pipeline Registry
 * =============================================================================
 */

import type {
    PlatformBootstrapPipeline
} from "./platform-bootstrap-pipeline";

const registry:
PlatformBootstrapPipeline[] = [];

export const PlatformBootstrapPipelineRegistry:
readonly PlatformBootstrapPipeline[] = registry;

export function registerPlatformBootstrapPipeline(
    pipeline: PlatformBootstrapPipeline
): void {

    registry.push(
        pipeline
    );

}
