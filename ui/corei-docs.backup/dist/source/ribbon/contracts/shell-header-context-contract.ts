/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-05-A
 *
 * FILE:
 * shell-header-context-contract.ts
 *
 * PURPOSE:
 * Institutional Ribbon Context Contracts
 *
 ******************************************************************************/

export interface ShellInstitutionIdentity {

    readonly name: string;

    readonly product: string;

}


export interface ShellEnvironmentIdentity {

    readonly environment: string;

    readonly region: string;

}


export interface ShellRuntimeIdentity {

    readonly runtimeId: string;

    readonly state: string;

    readonly health: string;

}


export interface ShellSessionContext {

    readonly sessionId: string;

    readonly operatorLabel: string;

}


export interface ShellOperatingContext {

    readonly workspace: string;

    readonly mode: string;

    readonly runtimeHealth: string;

}


export interface ShellWorkspaceContext {

    readonly workspaceId: string;

    readonly workspaceName: string;

    readonly workspaceState: string;

}


export interface ShellNotificationContext {

    readonly total: number;

    readonly critical: number;

    readonly unread: number;

}


export interface ShellHeaderContextContract {

    readonly institution:
        ShellInstitutionIdentity;


    readonly environment:
        ShellEnvironmentIdentity;


    readonly runtime:
        ShellRuntimeIdentity;


    readonly session:
        ShellSessionContext;


    readonly operatingContext:
        ShellOperatingContext;


    readonly workspace:
        ShellWorkspaceContext;


    readonly notifications:
        ShellNotificationContext;

}
