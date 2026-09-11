/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell-configuration.ts
 *
 * PURPOSE:
 * Institutional Shell Configuration
 *
 ******************************************************************************/

import type { ShellCapabilities } from "../contracts/shell-contract";

export interface ShellConfiguration {

    readonly id: string;

    readonly name: string;

    readonly version: string;

    readonly capabilities: ShellCapabilities;

    readonly diagnosticsEnabled: boolean;

    readonly browserObservable: boolean;

    readonly runtimeManaged: boolean;

}

export const DEFAULT_SHELL_CONFIGURATION: ShellConfiguration = {

    id: "corei-shell",

    name: "Institutional Shell",

    version: "25.17.1",

    capabilities: {

        navigation: true,

        runtime: true,

        workspace: true,

        workbench: true,

        experiences: true,

        applications: true,

        providers: true,

        diagnostics: true

    },

    diagnosticsEnabled: true,

    browserObservable: true,

    runtimeManaged: true

};
