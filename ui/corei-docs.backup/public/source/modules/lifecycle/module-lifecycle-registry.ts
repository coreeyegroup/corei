/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 10
 * Step        : 02
 *
 * File        : module-lifecycle-registry.ts
 * Purpose     : Module Lifecycle Registry
 * =============================================================================
 */

import type {
    ModuleLifecycle
} from "./module-lifecycle";

export const ModuleLifecycleRegistry:
readonly ModuleLifecycle[] = [];
