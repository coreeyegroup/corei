/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 11
 * Build Unit  : 02
 *
 * File        : workspace-persistence-manager.ts
 * Purpose     : Workspace Persistence Manager
 * =============================================================================
 */

import type {
    WorkspacePersistenceModel
} from "./workspace-persistence";

import {
    WorkspacePersistenceRegistry
} from "./workspace-persistence-registry";

import {
    persistenceRuntime
} from "../../workbench/workspace/persistence/runtime/persistence-runtime";

export class WorkspacePersistenceManager {

    public initialize(): void {

        persistenceRuntime.initialize();

    }

    public register(
        persistence: WorkspacePersistenceModel
    ): void {

        (
            WorkspacePersistenceRegistry as WorkspacePersistenceModel[]
        ).push(
            persistence
        );

    }

    public save(): void {

        persistenceRuntime.save();

    }

    public reset(): void {

        persistenceRuntime.reset();

    }

    public getAll():
    readonly WorkspacePersistenceModel[] {

        return WorkspacePersistenceRegistry;

    }

}
