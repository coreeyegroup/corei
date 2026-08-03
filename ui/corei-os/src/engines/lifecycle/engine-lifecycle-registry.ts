/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 02
 *
 * File        : engine-lifecycle-registry.ts
 * Purpose     : Engine Lifecycle Registry
 * =============================================================================
 */

import type {
    EngineLifecycle
} from "./engine-lifecycle";

const registry:
EngineLifecycle[] = [];

export const EngineLifecycleRegistry:
readonly EngineLifecycle[] = registry;

export function registerEngineLifecycle(
    lifecycle: EngineLifecycle
): void {

    registry.push(lifecycle);

}
