/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 01
 * Build Unit  : 01.10
 *
 * File        : shell-configuration.ts
 * Purpose     : Institutional Shell Configuration
 * =============================================================================
 */

export interface ShellConfiguration {

    readonly id: string;

    readonly name: string;

    readonly version: string;

    readonly environment: string;

    readonly startupMode: "normal" | "safe";

    readonly enableDiagnostics: boolean;

    readonly enableHealth: boolean;

    readonly enableExtensions: boolean;

}

export const DefaultShellConfiguration: ShellConfiguration = {

    id: "corei-shell",

    name: "COREI Institutional Shell",

    version: "1.0.0",

    environment: "production",

    startupMode: "normal",

    enableDiagnostics: true,

    enableHealth: true,

    enableExtensions: true

};
