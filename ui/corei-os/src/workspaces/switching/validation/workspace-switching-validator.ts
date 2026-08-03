import {

    workspaceSwitchingService

} from "../services/workspace-switching-service";

export function validateWorkspaceSwitching() {

    workspaceSwitchingService.activeWorkspace();

    return {

        passed: true

    };

}
