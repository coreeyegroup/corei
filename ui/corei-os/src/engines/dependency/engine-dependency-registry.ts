/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 11
 * Step        : 05
 *
 * File        : engine-dependency-registry.ts
 * Purpose     : Engine Dependency Registry
 * =============================================================================
 */

import type {
    EngineDependency
} from "./engine-dependency";

const registry:
EngineDependency[] = [];

export const EngineDependencyRegistry:
readonly EngineDependency[] = registry;

export function registerEngineDependency(
    dependency: EngineDependency
): void {

    registry.push(dependency);

}
