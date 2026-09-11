/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 06
 *
 * File        : lifecycle-registry.ts
 * Purpose     : Architecture Lifecycle Registry
 * =============================================================================
 */

import type {

    LifecycleModel

} from "./lifecycle-model";

export const LifecycleRegistry: readonly LifecycleModel[] = [

    {
        id: "bootstrap",
        order: 1,
        description: "Platform bootstrap.",
        status: "ACTIVE"
    },

    {
        id: "foundation",
        order: 2,
        description: "Platform foundation.",
        status: "ACTIVE"
    },

    {
        id: "composition",
        order: 3,
        description: "Institutional shell composition.",
        status: "ACTIVE"
    },

    {
        id: "runtime",
        order: 4,
        description: "Runtime activation.",
        status: "ACTIVE"
    },

    {
        id: "capability",
        order: 5,
        description: "Capability provider activation.",
        status: "RESERVED"
    },

    {
        id: "experience",
        order: 6,
        description: "Experience activation.",
        status: "RESERVED"
    }

];
