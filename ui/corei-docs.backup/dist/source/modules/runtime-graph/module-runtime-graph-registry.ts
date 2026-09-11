/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 08
 *
 * File        : module-runtime-graph-registry.ts
 * Purpose     : Module Runtime Graph Registry
 * =============================================================================
 */

import type {
    ModuleRuntimeGraph
} from "./module-runtime-graph";

export const ModuleRuntimeGraphRegistry:
readonly ModuleRuntimeGraph[] = [];
