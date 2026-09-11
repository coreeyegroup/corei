import {
    workspaceFinalValidationService
} from "../services/workspace-final-validation-service";

export class WorkspaceFinalValidationPlatform {

    public initialize(): void {

        workspaceFinalValidationService.initialize();

    }

    public validate() {

        return workspaceFinalValidationService.validate();

    }

}

export const workspaceFinalValidationPlatform =
    new WorkspaceFinalValidationPlatform();
