/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 01
 * =============================================================================
 */

import type { CapabilityModel } from "../models/capability";
import { CapabilityRegistry } from "../registry/capability-registry";

export class CapabilityManager {

    public register(
        capability: CapabilityModel
    ): void {

        (CapabilityRegistry as CapabilityModel[]).push(capability);

    }

    public getAll(): readonly CapabilityModel[] {

        return CapabilityRegistry;

    }

    public find(
        id: string
    ): CapabilityModel | undefined {

        return CapabilityRegistry.find(
            capability => capability.id === id
        );

    }

}
