/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-003
 * File       : environment.ts
 * Purpose    : Runtime Environment Definition
 * =============================================================================
 */

export interface RuntimeEnvironment {
    readonly applicationName: string;
    readonly applicationVersion: string;
    readonly mode: string;
    readonly development: boolean;
    readonly production: boolean;
}

export function createRuntimeEnvironment(): RuntimeEnvironment {
    const mode = import.meta.env.MODE;

    return {
        applicationName: "COREI Operating System",
        applicationVersion: "1.0.0",
        mode,
        development: mode === "development",
        production: mode === "production"
    };
}
