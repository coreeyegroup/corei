/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage : 25
 * Phase : 19
 * Step  : 15
 *
 * Purpose:
 * Shell / Workbench Integration
 *
 * Consumes existing platform capabilities only.
 * =============================================================================
 */

import {

    workspaceSwitchingService

} from "../../switching";

import {

    workspacePersistenceOrchestrationService

} from "../../persistence/orchestration";

import {

    workspaceRecoveryService

} from "../../recovery";

export class WorkspaceShellIntegrationService {

    public initialize(): void {

        workspacePersistenceOrchestrationService.initialize();

        workspaceRecoveryService.initialize();

    }

    public startup(): void {

        workspaceRecoveryService.restore();

    }

    public switchWorkspace(
        workspaceId: string
    ): void {

        workspaceSwitchingService.switchWorkspace(
            workspaceId
        );

        workspacePersistenceOrchestrationService.save();

    }

}

export const workspaceShellIntegrationService =

    new WorkspaceShellIntegrationService();
