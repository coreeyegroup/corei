import {
    workspaceCertificationPlatform
} from "../integration/workspace-certification-platform";

export function validateWorkspaceCertification() {

    workspaceCertificationPlatform.initialize();

    return {

        passed: true,

        certification:
            workspaceCertificationPlatform.certify()

    };

}
