/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE
 * Stage-25
 *
 * PHASE
 * Phase-17 — Institutional Design Language
 *
 * STEP
 * STEP-01.5 — Border System
 *
 * FILE
 * src/foundation/borders/borders.ts
 *
 * OWNER
 * Foundation
 *
 * PURPOSE
 * Defines the institutional border system used throughout the
 * COREI Operating System.
 *
 * RESPONSIBILITIES
 * • Border Width Scale
 * • Border Style Contract
 * • Border Radius Scale
 * • Component Border Standards
 * • Visual Consistency
 *
 * DESIGN REFERENCES
 * • Visual Studio Code
 * • Bloomberg Terminal
 * • TradingView Desktop
 * • Binance Desktop
 *
 * AUTHORITY
 * This file is the single source of truth for all border-related
 * foundation tokens. UI components must consume this module and
 * must not redefine border values locally.
 *
 ******************************************************************************/

export const BorderTokens = Object.freeze({

    width: {

        none: 0,

        hairline: 0.5,

        thin: 1,

        medium: 2

    },

    radius: {

        none: 0,

        xs: 2,

        sm: 4,

        md: 6

    },

    style: {

        solid: "solid",

        dashed: "dashed",

        dotted: "dotted"

    },

    component: {

        ribbon: 1,

        sidebar: 1,

        activityBar: 1,

        workspace: 1,

        panel: 1,

        inspector: 1,

        timeline: 1,

        statusBar: 1,

        dialog: 1,

        input: 1,

        table: 1,

        card: 1,

        button: 1

    }

});

export type BorderTokensContract =
    typeof BorderTokens;
