/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 16
 *
 * File        : workspace-coordination-service.ts
 * Purpose     : Workspace Event / State / Lifecycle Coordination
 * =============================================================================
 */

import {
    workspaceShellIntegrationService
} from "../../shell-integration";

import {
    workspaceRecoveryService
} from "../../recovery";

import {
    workspaceSwitchingService
} from "../../switching";

export class WorkspaceCoordinationService {

    public initialize(): void {

        workspaceShellIntegrationService.initialize();

    }

    public startup(): void {

        workspaceShellIntegrationService.startup();

    }

    public switchWorkspace(
        workspaceId: string
    ): void {

        workspaceSwitchingService.switchWorkspace(
            workspaceId
        );

    }

    public restore(): void {

        workspaceRecoveryService.restore();

    }

    public shutdown(): void {

        workspaceRecoveryService.reset();

    }

}

export const workspaceCoordinationService =
    new WorkspaceCoordinationService();
