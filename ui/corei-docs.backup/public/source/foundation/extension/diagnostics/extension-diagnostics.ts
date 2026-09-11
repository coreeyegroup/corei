/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 04.05
 *
 * File        : extension-diagnostics.ts
 * Purpose     : Platform Extension Diagnostics.
 * =============================================================================
 */

import { ExtensionManager } from "../manager";

/**
 * ============================================================================
 * Platform Extension Diagnostics
 * ============================================================================
 */
export function logExtensionDiagnostics(
    extension: ExtensionManager
): void {

    const context =
        extension.getContext();

    console.group(
        `[COREI] Extension : ${context.name}`
    );

    console.info(
        "Extension ID :",
        context.id
    );

    console.info(
        "Lifecycle    :",
        context.state
    );

    console.info(
        "Created At   :",
        context.createdAt
    );

    console.groupEnd();

}
