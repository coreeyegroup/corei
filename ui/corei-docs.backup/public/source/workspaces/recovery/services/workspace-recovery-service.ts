/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 14
 *
 * File        : workspace-recovery-service.ts
 * Purpose     : Workspace Recovery Service
 * =============================================================================
 */

import {
    workspacePersistenceService
} from "../../persistence";

export class WorkspaceRecoveryService {

    public initialize(): void {

        workspacePersistenceService.initialize();

    }

    public restore(): void {

        workspacePersistenceService.restore();

    }

    public reset(): void {

        workspacePersistenceService.reset();

    }

}

export const workspaceRecoveryService =
    new WorkspaceRecoveryService();
