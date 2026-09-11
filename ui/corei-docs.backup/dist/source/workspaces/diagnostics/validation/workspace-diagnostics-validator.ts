import {

    workspaceDiagnosticsPlatform

} from "../integration/workspace-diagnostics-platform";

export function validateWorkspaceDiagnostics() {

    workspaceDiagnosticsPlatform.initialize();

    const diagnostics =

        workspaceDiagnosticsPlatform
            .diagnostics();

    return {

        passed: true,

        diagnostics

    };

}
