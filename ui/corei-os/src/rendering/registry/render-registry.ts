/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-012
 * File       : render-registry.ts
 * Purpose    : Institutional Render Registry
 * =============================================================================
 */

import type {

    RenderModel

} from "../models/render";

export const RenderRegistry: readonly RenderModel[] = [

    {

        id: "core-shell",

        name: "COREI Shell",

        layer: "shell",

        visible: true,

        enabled: true

    },

    {

        id: "workspace",

        name: "Workspace",

        layer: "workspace",

        visible: true,

        enabled: true

    }

];
