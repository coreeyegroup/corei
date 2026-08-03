/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 05
 *
 * File        : ui-capability-manager.ts
 * Purpose     : UI Capability Manager
 * =============================================================================
 */

import type { UICapabilityModel } from "./ui-capability";
import { UICapabilityRegistry } from "./ui-capability-registry";

export class UICapabilityManager {

    public register(
        capability: UICapabilityModel
    ): void {

        (UICapabilityRegistry as UICapabilityModel[]).push(capability);

    }

    public getAll(): readonly UICapabilityModel[] {

        return UICapabilityRegistry;

    }

}
