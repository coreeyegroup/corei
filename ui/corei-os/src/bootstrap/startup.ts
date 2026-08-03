/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-003
 * File       : startup.ts
 * Purpose    : COREI OS Startup Sequence
 * =============================================================================
 */

import { createRuntimeEnvironment } from "./environment";

export interface StartupContext {
    readonly environment: ReturnType<typeof createRuntimeEnvironment>;
    readonly startedAt: Date;
}

export function startup(): StartupContext {
    return {
        environment: createRuntimeEnvironment(),
        startedAt: new Date()
    };
}
