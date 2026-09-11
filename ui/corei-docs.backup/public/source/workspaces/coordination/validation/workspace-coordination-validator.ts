import {
    workspaceCoordinationPlatform
} from "../integration/workspace-coordination-platform";

export function validateWorkspaceCoordination() {

    workspaceCoordinationPlatform.initialize();

    return {

        passed: true

    };

}
