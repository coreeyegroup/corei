/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 08
 *
 * File        : productivity-capability-manager.ts
 * Purpose     : Productivity Capability Manager
 * =============================================================================
 */

import type {
    ProductivityCapabilityModel
} from "./productivity-capability";

import {
    ProductivityCapabilityRegistry
} from "./productivity-capability-registry";

export class ProductivityCapabilityManager {

    public register(
        capability: ProductivityCapabilityModel
    ): void {

        (
            ProductivityCapabilityRegistry as ProductivityCapabilityModel[]
        ).push(capability);

    }

    public getAll():
    readonly ProductivityCapabilityModel[] {

        return ProductivityCapabilityRegistry;

    }

}
