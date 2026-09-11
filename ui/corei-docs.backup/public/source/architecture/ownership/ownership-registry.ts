/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 02
 *
 * File        : ownership-registry.ts
 * Purpose     : Repository Ownership Registry
 * =============================================================================
 */

import type { OwnershipModel } from "./ownership-model";

export const OwnershipRegistry: readonly OwnershipModel[] = [

    {
        module: "bootstrap",
        owner: "Bootstrap Layer",
        layer: "Bootstrap",
        phase: "Phase-01",
        responsibility: "Platform Startup",
        status: "ACTIVE"
    },

    {
        module: "foundation",
        owner: "Foundation Layer",
        layer: "Foundation",
        phase: "Phase-02",
        responsibility: "Platform Services",
        status: "ACTIVE"
    },

    {
        module: "shell",
        owner: "Composition Layer",
        layer: "Composition",
        phase: "Phase-03",
        responsibility: "Institutional Shell",
        status: "ACTIVE"
    },

    {
        module: "viewport",
        owner: "Composition Layer",
        layer: "Composition",
        phase: "Phase-03",
        responsibility: "Viewport Composition",
        status: "ACTIVE"
    },

    {
        module: "ribbon",
        owner: "Composition Layer",
        layer: "Composition",
        phase: "Phase-03",
        responsibility: "Top Ribbon",
        status: "ACTIVE"
    },

    {
        module: "navigation",
        owner: "Composition Layer",
        layer: "Composition",
        phase: "Phase-03",
        responsibility: "Navigation",
        status: "ACTIVE"
    },

    {
        module: "workspace",
        owner: "Composition Layer",
        layer: "Composition",
        phase: "Phase-03",
        responsibility: "Workspace Region",
        status: "ACTIVE"
    },

    {
        module: "intelligence",
        owner: "Composition Layer",
        layer: "Composition",
        phase: "Phase-03",
        responsibility: "Right Intelligence",
        status: "ACTIVE"
    },

    {
        module: "timeline",
        owner: "Composition Layer",
        layer: "Composition",
        phase: "Phase-03",
        responsibility: "Bottom Timeline",
        status: "ACTIVE"
    },

    {
        module: "system",
        owner: "Runtime Layer",
        layer: "Runtime",
        phase: "Phase-03",
        responsibility: "Integration Engine",
        status: "ACTIVE"
    }

];
