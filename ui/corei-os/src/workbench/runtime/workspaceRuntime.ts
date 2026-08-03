export interface WorkspaceRuntimeState {

    readonly workspaceName: string;

    readonly environment: string;

    readonly runtimeStatus: string;

    readonly dockStatus: string;

    readonly layout: string;

    readonly session: string;

    readonly view: string;

}

export const DEFAULT_WORKSPACE_RUNTIME: WorkspaceRuntimeState = {

    workspaceName: "Institutional",

    environment: "Development",

    runtimeStatus: "Connected",

    dockStatus: "Ready",

    layout: "Institutional",

    session: "Active",

    view: "Trading"

};
