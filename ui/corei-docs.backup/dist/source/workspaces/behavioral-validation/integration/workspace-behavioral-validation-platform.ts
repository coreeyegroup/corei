import {
    workspaceBehavioralValidationService
} from "../services/workspace-behavioral-validation-service";

export class WorkspaceBehavioralValidationPlatform {

    public initialize(): void {

        workspaceBehavioralValidationService.initialize();

    }

    public validate() {

        return workspaceBehavioralValidationService.validate();

    }

}

export const workspaceBehavioralValidationPlatform =
    new WorkspaceBehavioralValidationPlatform();
