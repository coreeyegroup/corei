import {

    workspacePersistenceOrchestrationService

} from "../services/workspace-persistence-orchestration-service";

export class WorkspacePersistenceOrchestration {

    public initialize(): void {

        workspacePersistenceOrchestrationService.initialize();

    }

    public persist(): void {

        workspacePersistenceOrchestrationService.save();

    }

}

export const workspacePersistenceOrchestration =
    new WorkspacePersistenceOrchestration();
