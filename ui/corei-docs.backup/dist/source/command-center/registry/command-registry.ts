/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-011
 * File       : command-registry.ts
 * Purpose    : Institutional Command Registry
 * =============================================================================
 */

import type {

    CommandModel

} from "../models/command";

export const CommandRegistry: readonly CommandModel[] = [

    {

        id: "open-workspace",

        title: "Open Workspace",

        group: "workspace",

        enabled: true,

        visible: true

    },

    {

        id: "switch-terminal",

        title: "Switch Terminal",

        group: "terminal",

        enabled: true,

        visible: true

    }

];
