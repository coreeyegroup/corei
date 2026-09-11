/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-016
 * File       : platform-registry.ts
 * Purpose    : Institutional Platform Registry
 * =============================================================================
 */

import type {

    PlatformModel

} from "../models/platform";

export const PlatformRegistry: readonly PlatformModel[] = [

    {

        id: "corei-platform",

        name: "COREI Operating System",

        version: "1.0.0",

        initialized: true,

        running: true

    }

];
