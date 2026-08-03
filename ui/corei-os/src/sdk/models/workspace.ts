/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-017
 * File       : workspace.ts
 * Purpose    : SDK Workspace Model
 * =============================================================================
 */

import type {

    WorkspaceContract

} from "../contracts/workspace-contract";

export interface WorkspaceModel extends WorkspaceContract {

    readonly active: boolean;

}
