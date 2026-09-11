import {
    workspaceBehavioralValidationPlatform
} from "../integration/workspace-behavioral-validation-platform";

export function validateWorkspaceBehavior() {

    workspaceBehavioralValidationPlatform.initialize();

    return {

        passed: true,

        behavior:
            workspaceBehavioralValidationPlatform.validate()

    };

}
