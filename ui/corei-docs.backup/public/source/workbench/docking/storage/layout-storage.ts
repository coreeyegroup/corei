/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-06
 *
 * FILE
 * layout-storage.ts
 * ============================================================================
 */

import type {

    DockLayout

} from "../contracts/dock-layout";

const PREFIX =

"corei.workspace.layout.";

export function loadWorkspaceLayout(

    workspace: string

): DockLayout | null {

    const raw =

        sessionStorage.getItem(

            PREFIX + workspace

        );

    if (!raw) {

        return null;

    }

    try {

        return JSON.parse(raw);

    }

    catch {

        return null;

    }

}

export function saveWorkspaceLayout(

    workspace: string,

    layout: DockLayout

): void {

    sessionStorage.setItem(

        PREFIX + workspace,

        JSON.stringify(layout)

    );

}

export function clearWorkspaceLayout(

    workspace: string

): void {

    sessionStorage.removeItem(

        PREFIX + workspace

    );

}
