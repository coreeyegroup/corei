import {

    workspaceDiagnosticsService

} from "../services/workspace-diagnostics-service";

export class WorkspaceDiagnosticsPlatform {

    public initialize(): void {

        workspaceDiagnosticsService.initialize();

    }

    public diagnostics() {

        return workspaceDiagnosticsService.collect();

    }

}

export const workspaceDiagnosticsPlatform =

    new WorkspaceDiagnosticsPlatform();
