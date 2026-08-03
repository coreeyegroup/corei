/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 18
 *
 * File        : workspace-multiplicity-service.ts
 * Purpose     : Workspace Multiplicity Coordination
 * =============================================================================
 */

import {
    WorkspaceManager
} from "../../manager";

import {
    workspaceCoordinationService
} from "../../coordination";

export interface WorkspaceMultiplicityState {

    readonly total: number;

    readonly activeWorkspaceId?: string;

}

export class WorkspaceMultiplicityService {

    constructor(
        private readonly manager = new WorkspaceManager()
    ) {}

    public initialize(): void {

        workspaceCoordinationService.initialize();

    }

    public snapshot(): WorkspaceMultiplicityState {

        return {

            total: this.manager.getAll().length,

            activeWorkspaceId:

                this.manager
                    .getActive()
                    ?.id

        };

    }

}

export const workspaceMultiplicityService =
    new WorkspaceMultiplicityService();
