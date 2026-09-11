/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-19.06
 *
 * FILE
 * persistence-runtime.ts
 *
 * PURPOSE
 * Authoritative Workspace Persistence Runtime
 * ============================================================================
 */

import {

    buildWorkspaceSnapshot

} from "../builder";

import {

    serializeWorkspace,
    deserializeWorkspace

} from "../serializer";

import {

    saveWorkspace,
    loadWorkspace,
    clearWorkspace

} from "../storage/workspace-storage";

import {

    useDockState

} from "../../../docking/state/dock-state";

class PersistenceRuntime {

    private workspaceId = "trading";

    initialize(): void {

        const snapshot =

            loadWorkspace(

                this.workspaceId

            );

        if (

            !snapshot

        ) {

            return;

        }

        const runtime =

            deserializeWorkspace(

                snapshot

            );

        useDockState

            .getState()

            .setLayout(

                runtime.layout

            );

    }

    save(): void {

        const input =

            buildWorkspaceSnapshot();

        const snapshot =

            serializeWorkspace(

                input

            );

        saveWorkspace(

            snapshot

        );

    }

    reset(): void {

        clearWorkspace(

            this.workspaceId

        );

    }

}

export const persistenceRuntime =

new PersistenceRuntime();
