import {
    workspaceRecoveryService
} from "../services/workspace-recovery-service";

export class WorkspaceRecoveryPlatform {

    public startup(): void {

        workspaceRecoveryService.initialize();
        workspaceRecoveryService.restore();

    }

    public shutdown(): void {

        workspaceRecoveryService.reset();

    }

}

export const workspaceRecoveryPlatform =
    new WorkspaceRecoveryPlatform();
