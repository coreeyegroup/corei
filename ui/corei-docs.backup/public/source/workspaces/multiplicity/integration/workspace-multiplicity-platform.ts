import {
    workspaceMultiplicityService
} from "../services/workspace-multiplicity-service";

export class WorkspaceMultiplicityPlatform {

    public initialize(): void {

        workspaceMultiplicityService.initialize();

    }

    public snapshot() {

        return workspaceMultiplicityService.snapshot();

    }

}

export const workspaceMultiplicityPlatform =
    new WorkspaceMultiplicityPlatform();
