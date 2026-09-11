import {
    workspaceMultiplicityPlatform
} from "../integration/workspace-multiplicity-platform";

export function validateWorkspaceMultiplicity() {

    workspaceMultiplicityPlatform.initialize();

    return {

        passed: true,

        multiplicity:
            workspaceMultiplicityPlatform.snapshot()

    };

}
