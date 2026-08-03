/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-016
 * File       : platform-runtime.ts
 * Purpose    : Institutional Platform Runtime
 * =============================================================================
 */

import {

    composePlatform

} from "../composition/platform-composition";

export function initializePlatformRuntime(): void {

    composePlatform();

}
