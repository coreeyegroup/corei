/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-017
 * File       : sdk-registry.ts
 * Purpose    : Institutional SDK Registry
 * =============================================================================
 */

import type {

    TerminalModel

} from "../models/terminal";

export const SDKRegistry: readonly TerminalModel[] = [

    {

        id: "infrastructure-terminal",

        name: "Infrastructure Terminal",

        version: "1.0.0",

        enabled: true,

        loaded: true

    },

    {

        id: "trading-terminal",

        name: "Trading Terminal",

        version: "1.0.0",

        enabled: true,

        loaded: false

    }

];
