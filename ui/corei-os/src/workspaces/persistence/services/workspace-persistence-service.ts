/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 11
 *
 * File        : workspace-persistence-service.ts
 * Purpose     : Institutional Workspace Persistence Service
 * =============================================================================
 */

import {

    WorkspacePersistenceManager

} from "../workspace-persistence-manager";

export class WorkspacePersistenceService {

    constructor(

        private readonly manager =
            new WorkspacePersistenceManager()

    ) {}

    public initialize(): void {

        this.manager.initialize();

    }

    public save(): void {

        this.manager.save();

    }

    public restore(): void {

        this.manager.initialize();

    }

    public reset(): void {

        this.manager.reset();

    }

    public getManager(): WorkspacePersistenceManager {

        return this.manager;

    }

}

export const workspacePersistenceService =

    new WorkspacePersistenceService();
