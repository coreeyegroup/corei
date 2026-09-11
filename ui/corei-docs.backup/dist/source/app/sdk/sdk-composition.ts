/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-006
 * File       : sdk-composition.ts
 * Purpose    : SDK Composition
 * =============================================================================
 */

import {

    initializeSDK

} from "../../sdk/lifecycle/sdk-lifecycle";

export function composeSDK(): void {

    initializeSDK();

}
