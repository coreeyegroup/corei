/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 17
 *
 * File        : workspace-diagnostics-service.ts
 * Purpose     : Workspace Diagnostics Service
 * =============================================================================
 */

import {
    workspaceCoordinationService
} from "../../coordination";

import {
    workspaceSwitchingService
} from "../../switching";

export interface WorkspaceDiagnostics {

    initialized: boolean;

    activeWorkspace?: string;

}

export class WorkspaceDiagnosticsService {

    public collect(): WorkspaceDiagnostics {

        return {

            initialized: true,

            activeWorkspace:

                workspaceSwitchingService
                    .activeWorkspace()

        };

    }

    public initialize(): void {

        workspaceCoordinationService.initialize();

    }

}

export const workspaceDiagnosticsService =

    new WorkspaceDiagnosticsService();
