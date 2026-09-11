/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-003
 * File       : bootstrap.ts
 * Purpose    : COREI OS Bootstrap Orchestrator
 * =============================================================================
 */

import { startup, type StartupContext } from "./startup";

export interface BootstrapContext {
    readonly startup: StartupContext;
}

export function bootstrap(): BootstrapContext {
    return {
        startup: startup()
    };
}
