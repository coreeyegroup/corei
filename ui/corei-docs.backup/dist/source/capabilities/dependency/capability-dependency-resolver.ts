/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 04
 *
 * File        : capability-dependency-resolver.ts
 * Purpose     : Capability Dependency Resolver
 * =============================================================================
 */

import { CapabilityDependencyGraph } from "./capability-dependency-graph";
import type { CapabilityDependency } from "./capability-dependency";

export class CapabilityDependencyResolver {

    public getAll(): readonly CapabilityDependency[] {

        return CapabilityDependencyGraph;

    }

    public resolve(
        capabilityId: string
    ): CapabilityDependency | undefined {

        return CapabilityDependencyGraph.find(
            dependency => dependency.capabilityId === capabilityId
        );

    }

}
