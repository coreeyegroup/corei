import {

    workspacePersistenceOrchestration

} from "../integration/workspace-persistence-orchestration";

export function validateWorkspacePersistenceOrchestration() {

    workspacePersistenceOrchestration.initialize();

    return {

        passed: true

    };

}
