/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 04.07
 *
 * File        : extension-validation.ts
 * Purpose     : Platform Extension Framework Validation.
 * =============================================================================
 */

import {

    ExtensionManager

} from "../manager";

import {

    ExtensionState

} from "../state/extension-state";

import {

    logExtensionDiagnostics

} from "../diagnostics";

/**
 * ============================================================================
 * Validates the Platform Extension Framework.
 * ============================================================================
 */
export function validateExtensionFramework(): void {

    const extension =
        new ExtensionManager(

            "validation-extension",

            "Validation Extension"

        );

    extension.load();

    extension.initialize();

    extension.activate();

    console.group(

        "[COREI] Platform Extension Validation"

    );

    console.info(

        "Activate    :",

        extension.getContext().state ===
        ExtensionState.ACTIVE
            ? "PASS"
            : "FAIL"

    );

    extension.deactivate();

    console.info(

        "Deactivate  :",

        extension.getContext().state ===
        ExtensionState.INACTIVE
            ? "PASS"
            : "FAIL"

    );

    extension.unload();

    console.info(

        "Unload      :",

        extension.getContext().state ===
        ExtensionState.UNLOADED
            ? "PASS"
            : "FAIL"

    );

    logExtensionDiagnostics(

        extension

    );

    console.groupEnd();

}
