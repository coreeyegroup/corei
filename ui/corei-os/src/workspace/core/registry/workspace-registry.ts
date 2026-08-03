import type { WorkspaceModel } from "../models/workspace-model";

export class WorkspaceRegistry {

    private readonly registry = new Map<string, WorkspaceModel>();

    register(workspace: WorkspaceModel): void {

        this.registry.set(workspace.id, workspace);

    }

    all(): WorkspaceModel[] {

        return [...this.registry.values()];

    }

}
