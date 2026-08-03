/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 09
 * Step        : 09
 *
 * File        : service-runtime-graph-registry.ts
 * Purpose     : Runtime Graph Registry
 * =============================================================================
 */

import type {
    ServiceRuntimeGraph
} from "./service-runtime-graph";

export const ServiceRuntimeGraphRegistry:
readonly ServiceRuntimeGraph[] = [];
