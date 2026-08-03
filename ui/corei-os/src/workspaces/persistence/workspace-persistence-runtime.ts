/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 11
 * Build Unit  : 02
 *
 * File        : workspace-persistence-runtime.ts
 * Purpose     : Workspace Persistence Runtime
 * =============================================================================
 */

import {

    WorkspacePersistenceManager

} from "./workspace-persistence-manager";

export interface WorkspacePersistenceRuntime {

    readonly initialized: boolean;

}

export const DefaultWorkspacePersistenceRuntime:
WorkspacePersistenceRuntime = {

    initialized: false

};

export const workspacePersistenceManager =

    new WorkspacePersistenceManager();
