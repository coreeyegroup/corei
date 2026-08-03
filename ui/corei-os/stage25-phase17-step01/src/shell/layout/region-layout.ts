/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-005
 * File       : region-layout.ts
 * Purpose    : Default Shell Region Layout
 * =============================================================================
 */

import type { ShellRegion } from "../contracts/region-contract";

export const DefaultShellRegions: readonly ShellRegion[] = [

    {

        id: "top",

        visible: true,

        resizable: false,

        collapsible: false,

        size: 42

    },

    {

        id: "left",

        visible: true,

        resizable: true,

        collapsible: true,

        size: 280

    },

    {

        id: "center",

        visible: true,

        resizable: false,

        collapsible: false,

        size: 0

    },

    {

        id: "right",

        visible: true,

        resizable: true,

        collapsible: true,

        size: 360

    },

    {

        id: "bottom",

        visible: true,

        resizable: true,

        collapsible: true,

        size: 32

    }

];
