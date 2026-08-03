/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-007
 * File       : startup.ts
 * Purpose    : Institutional Startup Lifecycle
 * =============================================================================
 */

import {

    composeBootstrap

} from "../bootstrap/bootstrap-composition";

import {

    composeRuntime

} from "../runtime/runtime-composition";

import {

    composePlatform

} from "../platform/platform-composition";

import {

    composeSDK

} from "../sdk/sdk-composition";

export function startupApplication(): void {

    composeBootstrap();

    composeRuntime();

    composePlatform();

    composeSDK();

}
