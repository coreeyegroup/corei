/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 03.07
 *
 * File        : event-validation.ts
 * Purpose     : Platform Event Framework Validation.
 * =============================================================================
 */

import {

    EventManager

} from "../manager";

import {

    logEventDiagnostics

} from "../diagnostics";

/**
 * ============================================================================
 * Validates the Platform Event Framework.
 * ============================================================================
 */
export function validateEventFramework(): void {

    const event =
        new EventManager<string>(

            "validation-event",

            "Validation Event"

        );

    let delivered = false;

    const handler = (

        payload: string

    ): void => {

        delivered = payload === "COREI";

    };

    event.subscribe(

        handler

    );

    event.publish(

        "COREI"

    );

    console.group(

        "[COREI] Platform Event Validation"

    );

    console.info(

        "Publish     :",

        event.get() === "COREI"
            ? "PASS"
            : "FAIL"

    );

    console.info(

        "Subscribe   :",

        delivered
            ? "PASS"
            : "FAIL"

    );

    event.unsubscribe(

        handler

    );

    logEventDiagnostics(

        event

    );

    console.groupEnd();

}
