import {
    workspaceFinalValidationPlatform
} from "../integration/workspace-final-validation-platform";

export function validateWorkspacePlatformFinal() {

    workspaceFinalValidationPlatform.initialize();

    return {

        passed: true,

        validation:
            workspaceFinalValidationPlatform.validate()

    };

}
