/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 11
 * Build Unit  : 01
 *
 * File        : workspace-persistence-platform-integration.ts
 * Purpose     : Integrates Platform Persistence with Operational Persistence
 * =============================================================================
 */

import {

    persistenceRuntime

} from "../../../workbench/workspace/persistence/runtime/persistence-runtime";

import {

    DefaultWorkspacePersistenceRuntime

} from "../workspace-persistence-runtime";

import {

    WorkspacePersistenceManager

} from "../workspace-persistence-manager";

export class WorkspacePersistencePlatformIntegration {

    constructor(

        private readonly manager =
            new WorkspacePersistenceManager()

    ) {}

    public initialize(): void {

        persistenceRuntime.initialize();

    }

    public save(): void {

        persistenceRuntime.save();

    }

    public reset(): void {

        persistenceRuntime.reset();

    }

    public getRuntime() {

        return DefaultWorkspacePersistenceRuntime;

    }

    public getManager(): WorkspacePersistenceManager {

        return this.manager;

    }

}
