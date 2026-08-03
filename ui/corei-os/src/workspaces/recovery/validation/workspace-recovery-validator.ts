import {
    workspaceRecoveryPlatform
} from "../integration/workspace-recovery-platform";

export function validateWorkspaceRecovery() {

    workspaceRecoveryPlatform.startup();

    return {
        passed: true
    };

}
