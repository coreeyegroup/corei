/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell-contract.ts
 *
 * PURPOSE:
 * Institutional Shell Contracts
 *
 ******************************************************************************/

export type ShellIdentifier = string;

export type ShellVersion = string;

export type ShellStatus =
    | "initializing"
    | "starting"
    | "running"
    | "degraded"
    | "stopping"
    | "stopped"
    | "failed";

export interface ShellMetadata {

    readonly id: ShellIdentifier;

    readonly name: string;

    readonly displayName: string;

    readonly version: ShellVersion;

    readonly description?: string;

}

export interface ShellCapabilities {

    readonly navigation: boolean;

    readonly runtime: boolean;

    readonly workspace: boolean;

    readonly workbench: boolean;

    readonly experiences: boolean;

    readonly applications: boolean;

    readonly providers: boolean;

    readonly diagnostics: boolean;

}

export interface ShellContract {

    readonly metadata: ShellMetadata;

    readonly capabilities: ShellCapabilities;

    readonly status: ShellStatus;

}
