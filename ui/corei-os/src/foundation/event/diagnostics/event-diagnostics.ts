/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 03.05
 *
 * File        : event-diagnostics.ts
 * Purpose     : Platform Event Diagnostics.
 * =============================================================================
 */

import { EventManager } from "../manager";

/**
 * ============================================================================
 * Platform Event Diagnostics
 * ============================================================================
 */
export function logEventDiagnostics<T>(
    event: EventManager<T>
): void {

    const context =
        event.getContext();

    console.group(
        `[COREI] Event : ${context.name}`
    );

    console.info(
        "Event ID    :",
        context.id
    );

    console.info(
        "Lifecycle   :",
        context.state
    );

    console.info(
        "Has Payload :",
        event.get() !== undefined
    );

    console.info(
        "Created At  :",
        context.createdAt
    );

    console.groupEnd();

}
