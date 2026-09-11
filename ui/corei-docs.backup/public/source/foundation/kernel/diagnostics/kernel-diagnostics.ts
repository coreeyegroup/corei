/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 06.06
 *
 * File        : kernel-diagnostics.ts
 * Purpose     : Application Kernel diagnostics.
 * =============================================================================
 */

import { kernelRegistry } from "../registry/kernel-registry";

export function logKernelDiagnostics(): void {

    if (!kernelRegistry.isRegistered()) {

        console.warn("[COREI] Application Kernel not registered.");

        return;

    }

    const kernel =
        kernelRegistry.get();

    const context =
        kernel.getContext();

    console.group("[COREI] Application Kernel");

    console.info("Kernel ID  :", context.id);
    console.info("State      :", context.state);
    console.info("Started At :", context.startedAt);

    console.groupEnd();

}
