/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 12
 *
 * File        : workspace-switching-service.ts
 * Purpose     : Workspace Switching Service
 * =============================================================================
 */

import {

    WorkspaceManager

} from "../../manager";

export class WorkspaceSwitchingService {

    constructor(

        private readonly manager =
            new WorkspaceManager()

    ) {}

    public switchWorkspace(
        workspaceId: string
    ): void {

        this.manager.setActive(
            workspaceId
        );

    }

    public activeWorkspace():
        string | undefined {

        return this.manager
            .getActive()
            ?.id;

    }

}

export const workspaceSwitchingService =
    new WorkspaceSwitchingService();
