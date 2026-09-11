/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 05.06
 *
 * File        : runtime-diagnostics.ts
 * Purpose     : Runtime diagnostics utilities.
 * =============================================================================
 */

import { runtimeRegistry } from "../registry/runtime-registry";

export function logRuntimeDiagnostics(): void {

    if (!runtimeRegistry.isRegistered()) {

        console.warn("[COREI] Runtime not registered.");

        return;

    }

    const runtime =
        runtimeRegistry.get();

    const context =
        runtime.getContext();

    console.group("[COREI] Runtime");

    console.info("Runtime ID :", context.id);
    console.info("State      :", context.state);
    console.info("Started At :", context.startedAt);

    console.groupEnd();

}
