/**
 * ============================================================================
 * Workspace Registry
 * ============================================================================
 */

import type {

    WorkspaceLayout

} from "../models/workspace-layout";

class WorkspaceRegistry {

    private readonly layouts =

        new Map<string, WorkspaceLayout>();

    register(

        layout: WorkspaceLayout

    ): void {

        this.layouts.set(

            layout.id,

            layout

        );

    }

    get(

        id: string

    ): WorkspaceLayout | undefined {

        return this.layouts.get(

            id

        );

    }

    list(): WorkspaceLayout[] {

        return [

            ...this.layouts.values()

        ];

    }

    clear(): void {

        this.layouts.clear();

    }

}

export const workspaceRegistry =

new WorkspaceRegistry();

