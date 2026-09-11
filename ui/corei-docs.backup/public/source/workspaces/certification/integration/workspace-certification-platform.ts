import {
    workspaceCertificationService
} from "../services/workspace-certification-service";

export class WorkspaceCertificationPlatform {

    public initialize(): void {

        workspaceCertificationService.initialize();

    }

    public certify() {

        return workspaceCertificationService.certify();

    }

}

export const workspaceCertificationPlatform =
    new WorkspaceCertificationPlatform();
