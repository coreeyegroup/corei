/**
 * =============================================================================
 * COREI Operating System
 * Stage 25 / Phase 19 / Step 12
 * =============================================================================
 */

import {

    workspaceSwitchingService

} from "../services/workspace-switching-service";

export class WorkspaceSwitchingPlatformIntegration {

    public switchWorkspace(
        workspaceId: string
    ): void {

        workspaceSwitchingService.switchWorkspace(
            workspaceId
        );

    }

}

export const workspaceSwitchingPlatformIntegration =

    new WorkspaceSwitchingPlatformIntegration();
