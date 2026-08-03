/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 13
 *
 * File        : workspace-persistence-orchestration-service.ts
 * =============================================================================
 */

import {

    workspacePersistenceService

} from "../../services";

export class WorkspacePersistenceOrchestrationService {

    public initialize(): void {

        workspacePersistenceService.initialize();

    }

    public save(): void {

        workspacePersistenceService.save();

    }

}

export const workspacePersistenceOrchestrationService =
    new WorkspacePersistenceOrchestrationService();
