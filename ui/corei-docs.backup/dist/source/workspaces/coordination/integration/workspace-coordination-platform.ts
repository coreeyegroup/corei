import {
    workspaceCoordinationService
} from "../services/workspace-coordination-service";

export class WorkspaceCoordinationPlatform {

    public initialize(): void {

        workspaceCoordinationService.initialize();

    }

    public startup(): void {

        workspaceCoordinationService.startup();

    }

    public shutdown(): void {

        workspaceCoordinationService.shutdown();

    }

}

export const workspaceCoordinationPlatform =
    new WorkspaceCoordinationPlatform();
