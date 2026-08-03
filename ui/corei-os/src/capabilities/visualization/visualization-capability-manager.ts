/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 07
 *
 * File        : visualization-capability-manager.ts
 * Purpose     : Visualization Capability Manager
 * =============================================================================
 */

import type {
    VisualizationCapabilityModel
} from "./visualization-capability";

import {
    VisualizationCapabilityRegistry
} from "./visualization-capability-registry";

export class VisualizationCapabilityManager {

    public register(
        capability: VisualizationCapabilityModel
    ): void {

        (
            VisualizationCapabilityRegistry as VisualizationCapabilityModel[]
        ).push(capability);

    }

    public getAll(): readonly VisualizationCapabilityModel[] {

        return VisualizationCapabilityRegistry;

    }

}
