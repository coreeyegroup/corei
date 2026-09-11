/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 07
 *
 * File        : standards-registry.ts
 * Purpose     : Architecture Standards Registry
 * =============================================================================
 */

import type {

    StandardsModel

} from "./standards-model";

export const StandardsRegistry: readonly StandardsModel[] = [

    {
        id: "no-patch-work",
        category: "Implementation",
        rule: "No partial edits allowed. Only complete files.",
        severity: "CRITICAL"
    },

    {
        id: "single-source-of-truth",
        category: "Architecture",
        rule: "Each module must have a single owner.",
        severity: "CRITICAL"
    },

    {
        id: "no-circular-dependency",
        category: "Dependency",
        rule: "Circular dependencies are forbidden.",
        severity: "CRITICAL"
    },

    {
        id: "layer-separation",
        category: "Architecture",
        rule: "Layers must not bypass dependency rules.",
        severity: "CRITICAL"
    },

    {
        id: "complete-files-only",
        category: "Implementation",
        rule: "No patch edits. Always full file replacement.",
        severity: "CRITICAL"
    }

];
