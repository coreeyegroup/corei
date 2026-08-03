/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 03
 *
 * File        : layer-registry.ts
 * Purpose     : Platform Layer Registry
 * =============================================================================
 */

import type { LayerModel } from "./layer-model";

export const LayerRegistry: readonly LayerModel[] = [

    {
        id: "bootstrap",
        name: "Bootstrap",
        order: 1,
        responsibility: "Platform startup and lifecycle.",
        status: "ACTIVE"
    },

    {
        id: "foundation",
        name: "Foundation",
        order: 2,
        responsibility: "Core platform services.",
        status: "ACTIVE"
    },

    {
        id: "composition",
        name: "Composition",
        order: 3,
        responsibility: "Institutional shell and layout.",
        status: "ACTIVE"
    },

    {
        id: "runtime",
        name: "Runtime",
        order: 4,
        responsibility: "Execution orchestration.",
        status: "ACTIVE"
    },

    {
        id: "capability",
        name: "Capability",
        order: 5,
        responsibility: "Capability provider integrations.",
        status: "RESERVED"
    },

    {
        id: "experience",
        name: "Experience",
        order: 6,
        responsibility: "Institutional experiences.",
        status: "RESERVED"
    }

];
