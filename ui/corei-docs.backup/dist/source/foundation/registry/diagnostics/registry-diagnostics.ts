/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 01.05
 *
 * File        : registry-diagnostics.ts
 * Purpose     : Registry diagnostics utilities.
 * =============================================================================
 */

import { RegistryManager } from "../manager";

/**
 * ============================================================================
 * Registry Diagnostics
 * ============================================================================
 */
export function logRegistryDiagnostics<T>(
    registry: RegistryManager<T>
): void {

    const context =
        registry.getContext();

    console.group(
        `[COREI] Registry : ${context.name}`
    );

    console.info(
        "Registry ID :",
        context.id
    );

    console.info(
        "State       :",
        context.state
    );

    console.info(
        "Entries     :",
        registry.list().length
    );

    console.info(
        "Created At  :",
        context.createdAt
    );

    console.groupEnd();

}
