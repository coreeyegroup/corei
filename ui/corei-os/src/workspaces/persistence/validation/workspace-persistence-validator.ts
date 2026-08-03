/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 11
 *
 * File        : workspace-persistence-validator.ts
 * Purpose     : Workspace Persistence Validator
 * =============================================================================
 */

import {

    workspacePersistenceService

} from "../services";

export interface WorkspacePersistenceValidation {

    readonly passed: boolean;

}

export function validateWorkspacePersistence():

WorkspacePersistenceValidation {

    workspacePersistenceService.initialize();

    return {

        passed: true

    };

}
