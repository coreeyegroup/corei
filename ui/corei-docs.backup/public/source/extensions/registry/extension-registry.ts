/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-014
 * File       : extension-registry.ts
 * Purpose    : Institutional Extension Registry
 * =============================================================================
 */

import type {

    ExtensionModel

} from "../models/extension";

export const ExtensionRegistry: readonly ExtensionModel[] = [

    {

        id: "infrastructure",

        name: "Infrastructure Terminal",

        version: "1.0.0",

        enabled: true,

        loaded: true

    },

    {

        id: "trading",

        name: "Trading Terminal",

        version: "1.0.0",

        enabled: true,

        loaded: false

    }

];
