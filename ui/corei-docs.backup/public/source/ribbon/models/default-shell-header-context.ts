/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-05-A
 *
 * FILE:
 * default-shell-header-context.ts
 *
 * PURPOSE:
 * Default Institutional Ribbon Context
 *
 ******************************************************************************/

import type {

    ShellHeaderContextContract

} from "../contracts/shell-header-context-contract";


export const DEFAULT_SHELL_HEADER_CONTEXT:
ShellHeaderContextContract = {


    institution: {

        name: "COREI",

        product: "Operating System"

    },


    environment: {

        environment: "development",

        region: "local"

    },


    runtime: {

        runtimeId: "corei-runtime",

        state: "ready",

        health: "healthy"

    },


    session: {

        sessionId: "default-session",

        operatorLabel: "Operator"

    },


    operatingContext: {

        workspace: "Institutional Workspace",

        mode: "standard",

        runtimeHealth: "healthy"

    },


    workspace: {

        workspaceId: "default",

        workspaceName: "Institutional Workspace",

        workspaceState: "ready"

    },


    notifications: {

        total: 0,

        critical: 0,

        unread: 0

    }

};
