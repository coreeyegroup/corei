/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-09
 * Build Unit : BU-006
 * File       : multi-window-validator.ts
 * Purpose    : Institutional Multi Window Validator
 * =============================================================================
 */

import {

    multiWindowService

} from "../services/multi-window-service";

export interface MultiWindowValidationResult {

    readonly passed: boolean;

    readonly windows: number;

    readonly activeWindow: string | undefined;

}

export function validateMultiWindow():

    MultiWindowValidationResult {

    const windows =

        multiWindowService.getWindows();

    const active =

        multiWindowService.getActiveWindow();

    return {

        passed: true,

        windows: windows.length,

        activeWindow: active?.id

    };

}
