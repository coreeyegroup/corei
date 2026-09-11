/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-004
 * File       : runtime-composition.ts
 * Purpose    : Runtime Composition
 * =============================================================================
 */

import {

    initializeRuntime

} from "../../runtime/lifecycle/runtime-lifecycle";

export function composeRuntime(): void {

    initializeRuntime();

}
