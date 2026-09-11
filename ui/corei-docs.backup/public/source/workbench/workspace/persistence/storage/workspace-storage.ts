/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-19.05
 *
 * FILE
 * workspace-storage.ts
 *
 * PURPOSE
 * Authoritative Workspace Snapshot Storage
 * ============================================================================
 */

import type {

    WorkspaceSnapshot

} from "../contracts";

const PREFIX =

    "corei.workspace.";

export function saveWorkspace(

    snapshot: WorkspaceSnapshot

): void {

    localStorage.setItem(

        PREFIX + snapshot.workspaceId,

        JSON.stringify(

            snapshot

        )

    );

}

export function loadWorkspace(

    workspaceId: string

): WorkspaceSnapshot | null {

    const raw =

        localStorage.getItem(

            PREFIX + workspaceId

        );

    if (

        !raw

    ) {

        return null;

    }

    return JSON.parse(

        raw

    ) as WorkspaceSnapshot;

}

export function clearWorkspace(

    workspaceId: string

): void {

    localStorage.removeItem(

        PREFIX + workspaceId

    );

}
