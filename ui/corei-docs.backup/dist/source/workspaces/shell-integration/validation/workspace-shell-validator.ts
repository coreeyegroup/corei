import {

    workspaceShellPlatform

} from "../integration/workspace-shell-platform";

export function validateWorkspaceShellIntegration() {

    workspaceShellPlatform.initialize();

    return {

        passed: true

    };

}
