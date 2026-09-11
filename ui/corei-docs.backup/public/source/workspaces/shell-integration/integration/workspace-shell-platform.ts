import {

    workspaceShellIntegrationService

} from "../services/workspace-shell-integration-service";

export class WorkspaceShellPlatform {

    public initialize(): void {

        workspaceShellIntegrationService.initialize();

    }

    public startup(): void {

        workspaceShellIntegrationService.startup();

    }

}

export const workspaceShellPlatform =

    new WorkspaceShellPlatform();
