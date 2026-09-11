/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-002
 * File       : provider-registry.ts
 * Purpose    : Provider Registry
 * =============================================================================
 */

import type {

    ProviderModel

} from "../models/provider";

export const ProviderRegistry: readonly ProviderModel[] = [

    {
        id: "theme",
        name: "Theme Provider",
        enabled: true
    },

    {
        id: "runtime",
        name: "Runtime Provider",
        enabled: true
    },

    {
        id: "platform",
        name: "Platform Provider",
        enabled: true
    },

    {
        id: "sdk",
        name: "SDK Provider",
        enabled: true
    }

];
