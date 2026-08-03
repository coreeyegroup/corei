/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 05
 * Step        : 06
 *
 * File        : workspace-capability-manager.ts
 * Purpose     : Workspace Capability Manager
 * =============================================================================
 */

import type { WorkspaceCapabilityModel } from "./workspace-capability";
import { WorkspaceCapabilityRegistry } from "./workspace-capability-registry";

export class WorkspaceCapabilityManager {

    public register(
        capability: WorkspaceCapabilityModel
    ): void {

        (WorkspaceCapabilityRegistry as WorkspaceCapabilityModel[])
            .push(capability);

    }

    public getAll(): readonly WorkspaceCapabilityModel[] {

        return WorkspaceCapabilityRegistry;

    }

}
