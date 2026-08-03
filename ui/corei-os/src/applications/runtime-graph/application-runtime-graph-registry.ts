/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 08
 * Step        : 09
 *
 * File        : application-runtime-graph-registry.ts
 * Purpose     : Runtime Graph Registry
 * =============================================================================
 */

import type {
    ApplicationRuntimeGraph
} from "./application-runtime-graph";

export const ApplicationRuntimeGraphRegistry:
readonly ApplicationRuntimeGraph[] = [];
