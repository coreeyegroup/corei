/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 05
 *
 * File        : dependency-registry.ts
 * Purpose     : Architecture Dependency Registry
 * =============================================================================
 */

import type {

    DependencyModel

} from "./dependency-model";

export const DependencyRegistry: readonly DependencyModel[] = [

    {
        source: "Bootstrap",
        target: "Foundation",
        allowed: true
    },

    {
        source: "Foundation",
        target: "Composition",
        allowed: true
    },

    {
        source: "Composition",
        target: "Runtime",
        allowed: true
    },

    {
        source: "Runtime",
        target: "Capability",
        allowed: true
    },

    {
        source: "Capability",
        target: "Experience",
        allowed: true
    },

    {
        source: "Experience",
        target: "Foundation",
        allowed: false
    },

    {
        source: "Capability",
        target: "Composition",
        allowed: false
    }

];
